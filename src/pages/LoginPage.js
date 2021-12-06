import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
 
  const emailRef = useRef()
  const passwordRef = useRef()
  const {logIn, currentUser} = useAuth()

  const [error, setError] =useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    
    try{
      setError('')
      setLoading(true)
      await logIn(emailRef.current.value, passwordRef.current.value)
    } catch{
        setError('Impossible de se connecter ! ')
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>CONNEXION</h1>
      <form onSubmit={handleSubmit} action="POST">
        {error && error}

        {currentUser && currentUser.email}
        <input placeholder="EMAIL" ref={emailRef}  type="text" id="email" />
        <input placeholder="password" ref={passwordRef}  type="password" id="password" />

        {loading && 'Chargement'}

        <button disabled={loading}>S'inscrire</button>
      </form>
    </div>
  );
};

export default LoginPage;