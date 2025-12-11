import './header.css';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header className="header_wrapper">
            <div className="container">
                <div>
                    <img  src={logo} alt='logo'/>
                </div>
                <div>

                </div>
            </div>
        </header>
    )
}

export default Header;