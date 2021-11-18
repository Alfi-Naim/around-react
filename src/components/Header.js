import logo from '../images/logo-vector.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Around the u.s logo" />
        </header>
    );
}

export default Header;
