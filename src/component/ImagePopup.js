function ImagePopup(props) {
    return (
        <div className={`popup popup_type_show ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__image-container">
            <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
            <img src={props.selectedCard.link} alt="alt text" className="popup__image" />
            <p className="popup__description">{props.selectedCard.name}</p>
        </div>
    </div>
    );
}

export default ImagePopup;
