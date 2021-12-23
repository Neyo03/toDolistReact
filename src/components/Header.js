import { faBars, faCog, faSearch, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { useAuth } from '../context/AuthContext';
import MessageContext from '../context/MessageContext';


const Header = () => {
    const {currentUser, logOut} = useAuth()
    const [openMenuUser, setOpenMenuUser] = useState(false)
    const message = useContext(MessageContext)

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
    async function handleLogout() {
        try{
          await logOut()
        } catch {
         message.setMessage('Deconnexion impossible')
         message.setTypeMessage('error')
        }
     }
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
           {currentUser !==null ? <div className="Header_profil">
                <FontAwesomeIcon className="Header_profil_icon" icon={faCog}/>
                <FontAwesomeIcon 
                    onClick={()=>{
                        openMenuUser(true)
                    }} 
                    className="Header_profil_icon Header_profil_user" icon={faUserCircle}
                />
                <div className='Header_profil_menu Header_profil_menu_open '>
                    <FontAwesomeIcon className="Header_profil_icon Header_profil_user" icon={faUserCircle}/>
                    <Link to='/'>Gerer profil</Link>
                    <span onClick={handleLogout}>Deconnexion</span>
                </div>
            </div>:
            <div className='Header_profil'>
                <Link className='Header_profil_buttons' to='connexion'>CONNEXION</Link>
                <Link id='Header_profil_inscription' className='Header_profil_buttons' to='inscription'>INSCRIPTION</Link>
            </div>}
            
        </div>
    );
};

export default Header;