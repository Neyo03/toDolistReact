import React, { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import Read from '../components/Read';
import Create from '../components/Create';
import Burger from '../components/Burger';
import MessageContext from '../context/MessageContext';
import LoginPage from './LoginPage'
import { useEffect } from 'react/cjs/react.development';

const MainPage = () => {

    const {currentUser} = useAuth()

    useEffect(()=>{
        if (currentUser ===null) {
            window.location.href = '/connexion'
        } 
    },[currentUser])
    
    return (
        <div className="Main">
            <Burger/>
            <div className='Main_create_read'>
                {currentUser && <Create/>}
                <div className="Main_body">
                    {currentUser && <Read/>}
                </div>
            </div>
           
        </div>
    );
};

export default MainPage;