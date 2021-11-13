import pen from '../images/pen.svg';
import Card from './Card';


function Main({
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    onCardClick,
    user,
    cards
}) {
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__image-container">
                    <img src={pen} alt="pen" className="profile__pen" onClick={onEditAvatarClick} />
                    <img className="profile__image" src={user.userAvatar} alt="profile image" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{user.userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfileClick}/>
                    <p className="profile__job">{user.userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlaceClick}/>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(cardItem => (
                        <Card
                            key={cardItem._id}
                            card = {cardItem}
                            onCardClick = {onCardClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
