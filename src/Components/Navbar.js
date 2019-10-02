import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo"></span>
            <ul className="nav-list">
                <li className="nav-list-item">Overview</li>
                <li className="nav-list-item">Buy</li>
                <li className="nav-list-item">Sell</li>
                <li className="nav-list-item">CFD</li>
                <li className="nav-list-item">Account</li>
            </ul>
        </div>
    );
}

export default Navbar;