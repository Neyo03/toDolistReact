import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import Burger from './Burger';

const Header = () => {
     function handleClick(){
         document.getElementsByClassName('Burger')[0].classList.toggle('visibleLinkClass')
         
     }
     function handleFocus(e) {
        document.getElementsByClassName('Header_input_icon')[0].children[0].style.color = '#333'
        document.getElementsByClassName('Header_input_icon')[0].children[1].style.color = '#333'
        document.getElementsByClassName('Header_input_icon')[0].style.backgroundColor = "#f1f1f1"
     }
     document.body.addEventListener('focusout', ()=>{
        document.getElementsByClassName('Header_input_icon')[0].children[0].style.color = ''
        document.getElementsByClassName('Header_input_icon')[0].children[1].style.color = ''
        document.getElementsByClassName('Header_input_icon')[0].style.backgroundColor = ""
     })
    return (
        <div className="Header">
            <div className="Header_burger_logo">
                <FontAwesomeIcon onClick={handleClick} className="Header_buger_icon" icon={faBars}/>
                <img src="https://fakeimg.pl/50/"/>
            </div>
            <div className="Header_search">
                <div className='Header_input_icon'>
                    <FontAwesomeIcon onClick={handleClick} className="Header_search_icon" icon={faSearch}/>
                    <input className='Header_search_bar' type="search" name="" placeholder='Rechercher' onFocus={(e)=>handleFocus(e)} id="" />
                </div>
            </div>
            <div className="Header_profil">
                <img src="https://fakeimg.pl/50/"/>
                <img src="https://fakeimg.pl/50/"/>
            </div>
            
        </div>
    );
};

export default Header;