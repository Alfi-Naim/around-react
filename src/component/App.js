import React, { useState, useEffect } from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import { api } from "../utils/api.js";
import ImagePopup from "./ImagePopup.js";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
    const [cards, setCards] = useState([]);
    const [userData, setUserData] = useState({
        userName: "",
        userDescription: "",
        userAvatar: ""
    })

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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false)
    }

    useEffect(() => {
        Promise.all([api.loadUserInfo(), api.loadCards()])
            .then(([userInfo, cardsData]) => {
                setUserData({
                    userName: userInfo.name,
                    userDescription: userInfo.about,
                    userAvatar: userInfo.avatar
                });
                setCards(cardsData);
            }).catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className="App">
            <div className="page">

                <div className="page-content">
                    <Header />
                    <Main
                        onEditAvatarClick={handleEditAvatarClick}
                        onEditProfileClick={handleEditProfileClick}
                        onAddPlaceClick={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        user={userData}
                        cards={cards}
                    />

                    <Footer />

                    <PopupWithForm
                        name="avatar"
                        title="Change profile picture"
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        submitTitle="Save"
                        children={
                            <label className="popup__form-field">
                                <input className="popup__input" type="url" id="avatar-url-input" name="link" placeholder="Image link" defaultValue=""
                                    required />
                                <span className="popup__error avatar-url-input-error"></span>
                            </label>
                        }
                    />
                    <PopupWithForm
                        name="edit"
                        title="Edit profile"
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        submitTitle="Save"
                        children={
                            <>
                                <label className="popup__form-field">
                                    <input className="popup__input" type="text" id="name-input" name="name" placeholder="Name" defaultValue=""
                                        minLength="2" maxLength="40" required />
                                    <span className="popup__error name-input-error"></span>
                                </label><label className="popup__form-field">
                                    <input className="popup__input" type="text" id="job-input" name="job" placeholder="About me" defaultValue=""
                                        minLength="2" maxLength="200" required />
                                    <span className="popup__error job-input-error"></span>
                                </label>
                            </>
                        }
                    />
                    <PopupWithForm
                        name="add"
                        title="New place"
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        submitTitle="Create"
                        children={
                            <>
                                <label className="popup__form-field">
                                    <input className="popup__input" type="text" id="title-input" name="name" placeholder="Title" defaultValue=""
                                        minLength="1" maxLength="30" required />
                                    <span className="popup__error title-input-error"></span>
                                </label><label className="popup__form-field">
                                    <input className="popup__input" type="url" id="url-input" name="link" placeholder="Image link" defaultValue=""
                                        required />
                                    <span className="popup__error url-input-error"></span>
                                </label>
                            </>
                        }
                    />

                    <ImagePopup
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                        selectedCard={selectedCard}
                    />

                </div>
            </div>
        </div>
    );
}

export default App;
