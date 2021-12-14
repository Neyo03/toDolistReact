import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import { UIdContext } from './UIdContext';


const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const [uId, setUid] = useState(null);
    
    function signUp(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    function logIn(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }
    function logOut() {
        return firebase.auth().signOut();
    }

    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            setCurrentUser(user)
            if (user) {
                setUid(user.uid)
            }
            
        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        logIn,
        signUp, 
        logOut
    }
    
    return (
        <AuthContext.Provider value={value}>
            <UIdContext.Provider value={uId}>
                {children}
            </UIdContext.Provider>
        </AuthContext.Provider>
    );
};
