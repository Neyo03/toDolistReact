import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Read from '../components/Read';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';


const MainPage = () => {
    const [error, setError] = useState('')
    const {currentUser, logOut} = useAuth()
    async function handleLogout() {
        setError('')
       try{
         await logOut()
       } catch {
        setError('Deconnexion impossible')
       }
    }
    return (
        <div>
            {error && error}
            {currentUser && <p>Vous êtes connecté en tant que {currentUser.email} </p> }
            {currentUser && <button onClick={handleLogout}>SE DECONNECTER</button>}
            {currentUser && <Link to='newNote'>+</Link>} 
            {currentUser && <Read/>}
            {!currentUser && <LoginPage/>}
        </div>
    );
};

export default MainPage;