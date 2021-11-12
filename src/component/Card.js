import heart from '../images/heart.svg';
import trash from '../images/trash.svg';

function Card(props) {

    function handleCardClick () {
        props.onCardClick(props.card.name, props.card.link)
    }

    return (
        <li key={props.card._id} className="element">
            <img src={trash} alt="" className="element__trash" />
            <img className="element__image" src={props.card.link} alt="" onClick={handleCardClick} />
            <div className="element__info">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__favorite-container">
                    <button className="element__favorite-button" type="button">
                        <img className="element__favorite" src={heart} alt="heart"/>
                    </button>
                    <p className="element__favorite-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
