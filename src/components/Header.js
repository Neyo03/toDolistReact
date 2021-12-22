import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Header = () => {
    const {currentUser} = useAuth()

     function handleClick(){
         document.getElementsByClassName('Burger')[0].classList.toggle('visibleLinkClass')
         
     }
     function handleFocus(e) {
        e.stopPropagation()
        document.getElementsByClassName('Header_input_icon')[0].children[0].style.color = '#333'
        document.getElementsByClassName('Header_input_icon')[0].children[1].style.color = '#333'
        document.getElementsByClassName('Header_input_icon')[0].style.backgroundColor = "#f1f1f1"
     }
     useEffect(()=>{
        document.body.addEventListener('focusout', (e)=>{
            e.stopPropagation()
            document.getElementsByClassName('Header_input_icon')[0].children[0].style.color = ''
            document.getElementsByClassName('Header_input_icon')[0].children[1].style.color = ''
            document.getElementsByClassName('Header_input_icon')[0].style.backgroundColor = ""
         })
     },[])
    return (
        <div className="Header">
            <div className="Header_burger_logo">
                <FontAwesomeIcon onClick={handleClick} className="Header_buger_icon" icon={faBars}/>
                <img src="https://fakeimg.pl/50/" alt='image header'/>
            </div>
            <div className="Header_search">
                <div className='Header_input_icon'>
                    <FontAwesomeIcon onClick={handleClick} className="Header_search_icon" icon={faSearch}/>
                    <input className='Header_search_bar' type="search" name="" placeholder='Rechercher' onFocus={(e)=>handleFocus(e)} id="" />
                </div>
            </div>
           {currentUser ? <div className="Header_profil">
                <img src="https://fakeimg.pl/50/" alt='image header'/>
                <img src="https://fakeimg.pl/50/" alt='image header'/>
            </div>:
            <div className='Header_profil'>
                <Link className='Header_profil_buttons' to='connexion'>CONNEXION</Link>
                <Link id='Header_profil_inscription' className='Header_profil_buttons' to='inscription'>INSCRIPTION</Link>
            </div>}
            
        </div>
    );
};

export default Header;