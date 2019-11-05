import React from 'react';
import  { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
        <div>HEADER</div>
        <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/login">Login Page</Link></li>
            <li><Link to="/admin">Admin Page</Link></li>
        </ul>
        </>
    )
}

export default Header;
