import React from "react";
import { useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {

    const [avatar, setAvatar] = useState("");
    const currentUser = React.useContext(CurrentUserContext);

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar);
    }

    React.useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Change profile picture"
            isOpen={isOpen}
            onClose={onClose}
            submitTitle="Save"
            onSubmit={handleSubmit}>

            <label className="popup__form-field">
                <input className="popup__input" type="url" id="avatar-url-input" name="link" value={avatar || ""} placeholder="Image link" onChange={handleAvatarChange}
                    required />
                <span className="popup__error avatar-url-input-error"></span>
            </label>

        </PopupWithForm>

    );
}

export default EditAvatarPopup;
