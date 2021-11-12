import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import { api } from "../utils/api.js";
import ImagePopup from "./ImagePopup.js";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard , setSelectedCard ] = React.useState({name: "", link: ""});
    const [cards, setCards] = React.useState([]);
    const [userData, setUserData] = React.useState({
        userName: "Jacques Cousteau",
        userDescription: "Explorer",
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

    React.useEffect(() => {
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
                        onCardClick = {handleCardClick}
                        user={userData}
                        cards = {cards}
                    />

                    <Footer />
                    
                    <PopupWithForm
                        name="avatar"
                        title="Change profile picture"
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                    />
                    <PopupWithForm
                        name="edit"
                        title="Edit profile"
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                    />
                    <PopupWithForm
                        name="add"
                        title="New place"
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
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
