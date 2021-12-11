import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import Burger from './Burger';

const Header = () => {

     function handleClick(){
         document.getElementsByClassName('Burger')[0].classList.toggle('visibleLinkClass')
     }
    return (
        <div className="Header">
            <div className="Header_burger_logo">
                <FontAwesomeIcon onClick={handleClick} className="Header_buger_icon" icon={faBars}/>
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