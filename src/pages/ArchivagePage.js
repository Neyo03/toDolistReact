import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import Burger from '../components/Burger';
import Read from '../components/Read';
import { useAuth } from '../context/AuthContext';

const ArchivagePage = () => {
    const {currentUser} = useAuth()
    useEffect(()=>{
        if (currentUser ===null) {
            window.location.href = '/connexion'
        } 
    },[currentUser])
    return (
        <div className="Main">
            <Burger/>
            <div className="Main_body">
                {currentUser && <Read/>}
            </div>
           
        </div>
    );
};

export default ArchivagePage;