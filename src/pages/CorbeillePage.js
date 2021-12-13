import React, { useContext, useEffect } from 'react';
import Burger from '../components/Burger';
import Read from '../components/Read';
import { useAuth } from '../context/AuthContext';
import MessageContext from '../context/MessageContext';

const CorbeillePage = () => {
    const {currentUser} = useAuth()
    const message = useContext(MessageContext)
    useEffect(()=>{

        message.setMessage('Les notes dans la corbeille sont conservées pendant 7 jours')
        message.setTypeMessage('autre')


    },[])
    return (
        <div className="Main">
            <Burger/>
            <div className="Main_body">
                {currentUser && <Read/>}
            </div>
           
        </div>
    );
};

export default CorbeillePage;