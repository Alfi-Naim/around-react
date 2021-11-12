function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__form-container">
                <form className="popup__form" name={props.formName}>
                    <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    <button className="popup__button" type="submit">{props.submitTitle}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
