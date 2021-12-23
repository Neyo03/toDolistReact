import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef, useState } from 'react';
import Burger from '../components/Burger';
import Message from '../components/Message';
import { useAuth } from '../context/AuthContext';
import MessageContext from '../context/MessageContext';

const InscriptionPage = () => {
  // const [user, setUser] = useState({
  //   email:null, 
  //   password:null
  // })
  
  // const {email, password} = user
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signUp} = useAuth()

  const [loading, setLoading] = useState(false)
  const [icons, setIcons] = useState(faEye)
  const[viewPassword, setViewPassword] = useState(false)
  const message = useContext(MessageContext)

  async function handleSubmit(e){
    e.preventDefault()
    if (passwordRef.current.value !==passwordConfirmRef.current.value) {
      message.setMessage('Les mots de passe ne sont pas identiques ')
      message.setTypeMessage('error')
    }

    try{
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
      message.setMessage('Compte créé avec successe.')
      message.setTypeMessage('sucess')
    } catch(e){
      if(e.code === "auth/email-already-in-use"){
        message.setMessage('Adresse e-mail déjà utilisée.')
        message.setTypeMessage('error')
      }else if (e.code==="auth/weak-password") {
        message.setMessage('Le mot de passe doit faire 6 caractères minimum ')
        message.setTypeMessage('error')
      }
      else{
        message.setMessage('Impossible de créer un compte, veuillez réessayer ')
        message.setTypeMessage('error')
      }
    }
    setLoading(false)
  }

  return (
    <div className='Login'>
      { window.location.pathname ==='/inscription' && <Burger/>}
      <form className='Login_form' onSubmit={handleSubmit} action="POST">
      <h1 className='Login_title'>INSCRIPTION</h1>
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
        
        <input placeholder={viewPassword ? "Confirmer mot de passe" : '**********'} ref={passwordConfirmRef}  type={viewPassword===false ? "password" : 'text'} id="confirmPassword" />
        <button disabled={loading}>{loading ? 'Chargement' : 'S\'inscrire'}</button>
      </form>
      <Message message={message.message} type={message.typeMessage} />
    </div>
  );
};

export default InscriptionPage;