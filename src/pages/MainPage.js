import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Read from '../components/Read';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Create from '../components/Create';


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
        <div className="Main">
            <Header/>
            {currentUser && <Create/>}
            <div className="Main_body">
                {error && error}
                {/* {currentUser && <p>Vous êtes connecté en tant que {currentUser.email} </p> }
                {currentUser && <button onClick={handleLogout}>SE DECONNECTER</button>} */}
                {currentUser && <Read/>}
            </div>
           
        </div>
    );
};

export default MainPage;