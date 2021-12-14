import React, { useContext, useRef, useState } from 'react';
import Message from '../components/Message';
import { useAuth } from '../context/AuthContext';
import MessageContext from '../context/MessageContext';
const LoginPage = () => {
 
  const emailRef = useRef()
  const passwordRef = useRef()
  const {logIn, currentUser} = useAuth()
  const [loading, setLoading] = useState(false)

  
 const message = useContext(MessageContext)


  async function handleSubmit(e){
    e.preventDefault()
    
    try{
      setLoading(true)
      await logIn(emailRef.current.value, passwordRef.current.value)
    } catch{
      message.setMessage('Impossible de se connecter ! Veuillez réessayer.')
      message.setTypeMessage('error')
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>CONNEXION</h1>
      <form onSubmit={handleSubmit} action="POST">
        {currentUser && currentUser.email}
        <input placeholder="EMAIL" ref={emailRef}  type="text" id="email" />
        <input placeholder="password" ref={passwordRef}  type="password" id="password" />

        {loading && 'Chargement'}

        <button disabled={loading}>S'inscrire</button>
      </form>
      <Message message={message.message} type={message.typeMessage} />
    </div>
  );
};

export default LoginPage;