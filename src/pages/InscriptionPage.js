import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

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

  const [error, setError] =useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    if (passwordRef.current.value !==passwordConfirmRef.current.value) {
      return setError('Mot de passe ne sont pas identiques')
    }

    try{
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
    } catch{
        setError('Impossible de créer un compte, nos agents sont entrain de régler le probleme')
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>INSCRIPTION</h1>
      <form onSubmit={handleSubmit} action="POST">
        {error && error}
        <input placeholder="EMAIL" ref={emailRef}  type="text" id="email" />
        <input placeholder="password" ref={passwordRef}  type="password" id="password" />
        <input placeholder="password CONFIRM" ref={passwordConfirmRef}  type="password" id="confirmPassword" />

        {loading && 'Chargement'}

        <button disabled={loading}>S'inscrire</button>
      </form>
    </div>
  );
};

export default InscriptionPage;