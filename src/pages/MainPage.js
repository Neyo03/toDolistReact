import React, { useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Read from '../components/Read';
import Create from '../components/Create';
import Burger from '../components/Burger';
import MessageContext from '../context/MessageContext';


const MainPage = () => {
    const {currentUser, logOut} = useAuth()
    const message = useContext(MessageContext)
    async function handleLogout() {
       try{
         await logOut()
       } catch {
        message.setMessage('Deconnexion impossible')
        message.setTypeMessage('error')
       }
    }
    return (
        <div className="Main">
            <Burger/>
            <div className='Main_create_read'>
                {currentUser && <Create/>}
                <div className="Main_body">
                    {/* {currentUser && <p>Vous êtes connecté en tant que {currentUser.email} </p> }
                    {currentUser && <button onClick={handleLogout}>SE DECONNECTER</button>} */}
                    {currentUser && <Read/>}
                </div>
            </div>
           
        </div>
    );
};

export default MainPage;