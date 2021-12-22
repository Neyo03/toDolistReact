import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
import Burger from '../components/Burger';
import Message from '../components/Message';
import { useAuth } from '../context/AuthContext';
import MessageContext from '../context/MessageContext';
const LoginPage = () => {
 
  const emailRef = useRef()
  const passwordRef = useRef()
  const {logIn, currentUser} = useAuth()
  const [loading, setLoading] = useState(false)
  const [icons, setIcons] = useState(faEye)
  const[viewPassword, setViewPassword] = useState(false)


  // if (currentUser) {
  //   window.location.href = '/'
  // } 
  
 

  
 const message = useContext(MessageContext)


  async function handleSubmit(e){
    e.preventDefault()
    
    try{
      setLoading(true)
      await logIn(emailRef.current.value, passwordRef.current.value)
      message.setMessage('Vous êtes connecté en tant que '+ currentUser.email)
      message.setTypeMessage('sucess') 
    } catch{
      message.setMessage('Impossible de se connecter ! Veuillez réessayer.')
      message.setTypeMessage('error')
    }
    setLoading(false)
    
  }

  return (
    <div className='Login'>
      { window.location.pathname ==='/connexion' && <Burger/>}
      <form className='Login_form' onSubmit={handleSubmit} action="POST">
      <h1 className='Login_title'>CONNEXION</h1>
        <input placeholder="Adresse e-mail" ref={emailRef}  type="text" id="email" />
        <div className='Login_password_eyes'>
          <input placeholder={viewPassword ? "Mot de passe" : '**********'} ref={passwordRef}  type={viewPassword===false ? "password" : 'text'} id="password" />
          <FontAwesomeIcon 
            className="Login_icons" 
            onClick={()=>
                {
                  setViewPassword(!viewPassword)
                  icons===faEye ? setIcons(faEyeSlash) : setIcons(faEye)
                }
            } 
            icon={icons} 
          />
        </div>
        
        <button disabled={loading}>{loading ? 'Chargement' : 'Se connecter'}</button>
      </form>
      <Message message={message.message} type={message.typeMessage} />
    </div>
  );
};

export default LoginPage;