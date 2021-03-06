import React, { useState, useEffect } from "react";

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";

import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const closePopupByEscape = (evt) => {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        };

        document.addEventListener("keydown", closePopupByEscape);
        return () => document.removeEventListener("keydown", closePopupByEscape);
    }, []);

    useEffect(() => {
        const closePopupByOutsideClick = (evt) => {
            if (evt.target.classList.contains("popup")) {
                closeAllPopups();
            }
        };

        document.addEventListener("click", closePopupByOutsideClick);
        return () => document.removeEventListener("keydown", closePopupByOutsideClick);
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(name, link) {
        setSelectedCard({
            name: name,
            link: link
        });
        setIsImagePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards(cards.filter((newCard) => newCard._id !== card._id))
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdateUser({ name, about }) {
        api.setUserInfo({ name, about }).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar({ link: avatar }).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleAddPlace({ name, link }) {
        api.addCard({ name, link }).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((error) => {
            console.log(error);
        });
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false)
    }

    useEffect(() => {
        Promise.all([api.loadUserInfo(), api.loadCards()])
            .then(([userInfo, cardsData]) => {
                setCurrentUser(userInfo);
                setCards(cardsData);
            }).catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">

                    <div className="page-content">
                        <Header />
                        <Main
                            onEditAvatarClick={handleEditAvatarClick}
                            onEditProfileClick={handleEditProfileClick}
                            onAddPlaceClick={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                        />

                        <Footer />

                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar} />

                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser} />

                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlace}
                        ></AddPlacePopup>


                        <ImagePopup
                            isOpen={isImagePopupOpen}
                            onClose={closeAllPopups}
                            selectedCard={selectedCard}
                        />

                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
