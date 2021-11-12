import pen from '../images/pen.svg';
import Card from './Card';


function Main(props) {
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__image-container">
                    <img src={pen} alt="pen" className="profile__pen" onClick={props.onEditAvatarClick} />
                    <img className="profile__image" src={props.user.userAvatar} alt="profile image" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{props.user.userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
                    <p className="profile__job">{props.user.userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map(cardItem => (
                        <Card
                            key={cardItem._id}
                            card = {cardItem}
                            onCardClick = {props.onCardClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
