import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Safe.png'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useContext(UserContext);


    console.log(user)
    return (
        <div className="header">
            <div>
                <img src={logo} alt="" />
            </div>

            <nav className='container-fluid'>
                <Link to="/home">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/contact">Contact</Link>
                {/* <Link to="/login">{user.name}</Link>  */}
                {user.email ? <Link to="/login">{user.email}</Link> : <Link to="/login">Login</Link>}

            </nav>
        </div>
    );
};

export default Header;