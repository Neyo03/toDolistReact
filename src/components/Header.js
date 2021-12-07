import React from 'react';
import Burger from './Burger';

const Header = () => {
    return (
        <div className="Header">
            <div className="Header_burger_logo">
                <Burger/>
                <img src="https://fakeimg.pl/50/"/>
            </div>
            <div className="Header_search">
                <input type="search" name="" id="" />
            </div>
            <div className="Header_profil">
                <img src="https://fakeimg.pl/50/"/>
                <img src="https://fakeimg.pl/50/"/>
            </div>
            
        </div>
    );
};

export default Header;