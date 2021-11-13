import heartImage from '../images/heart.svg';
import trashImage from '../images/trash.svg';

function Card({
    cardId,
    card,
    onCardClick
}) {

    function handleCardClick () {
        onCardClick(card.name, card.link)
    }

    return (
        <li key={card._id} className="element">
            <img src={trashImage} alt="" className="element__trash" />
            <img className="element__image" src={card.link} alt="" onClick={handleCardClick} />
            <div className="element__info">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__favorite-container">
                    <button className="element__favorite-button" type="button">
                        <img className="element__favorite" src={heartImage} alt="heart Image"/>
                    </button>
                    <p className="element__favorite-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
