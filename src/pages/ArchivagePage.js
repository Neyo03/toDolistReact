import React from 'react';
import Burger from '../components/Burger';
import Read from '../components/Read';
import { useAuth } from '../context/AuthContext';

const ArchivagePage = () => {
    const {currentUser} = useAuth()
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