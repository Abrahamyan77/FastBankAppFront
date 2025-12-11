import './header.css';
import logo from '../../images/logo.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header_wrapper">
            <div className="container">
                <div>
                    <div className='header_inner'>
                        <img src={logo} alt='logo' />

                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/kpi">KPI</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;