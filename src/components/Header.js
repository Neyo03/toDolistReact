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
        document.body.addEventListener('click', (e)=>{
            e.stopPropagation()
            
            if (!e.target.classList.contains("Header_profil_user")){
                // console.log(e.target.parentElement.parentElement.classList);
                setOpenMenuUser(false)
            }
            if ( e.target.parentElement.parentElement.classList.contains('Header_profil_menu') || e.target.parentElement.classList.contains('Header_profil_menu') || e.target.classList.contains('Header_profil_menu') ||e.target.classList.contains('Header_profil_menu')) {
                setOpenMenuUser(true)
            }
            
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
                <FontAwesomeIcon 
                    onClick={()=>{
                        setOpenMenuUser(!openMenuUser)
                    }} 
                    className="Header_profil_icon Header_profil_user" icon={faUserCircle}
                />
                <div className={`Header_profil_menu${openMenuUser ? ' Header_profil_menu_open ': ""}`}>
                    <div className='Header_profil_menu_gerer'>
                        <FontAwesomeIcon className="Header_profil_icon Header_profil_user" icon={faUserCircle}/>
                        <span>{currentUser && currentUser.email}</span>
                        <Link style={{marginLeft :'15px'}} to='/'>Gérer le profil</Link>
                    </div>
                    <div>
                        <Link id='Header_profil_menu_param' to=''>Paramètres</Link>
                        <span id='Header_profil_menu_deco' onClick={handleLogout}>Deconnexion</span>
                    </div>
                    <div className='Header_profil_menu_conditions'>
                        <Link to=''>Conditions d'utilisation</Link>
                        <Link to=''>Règles de confidentialité</Link>
                    </div>
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