import { auth } from 'firebase';
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
    const userDb = firebase.database().ref('userDb')
    
    async function signUp(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    async function logIn(email, password){
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
                if (userDb.children.uid !== user.uid ) {
                    userDb.push({
                        uid :user.uid ,
                        email : user.email,
                        nom : '',
                        prenom : '',
                        pseudo :''
                    })
                }
                
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
