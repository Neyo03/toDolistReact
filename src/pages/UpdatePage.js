import React, { useEffect, useState } from 'react';

import firebase from '../api/fireBaseConfig';
import { useLocation } from 'react-router';
const UpdatePage = () => {
    const location = useLocation()
    const [titreUpdate, setTitreUpdate] = useState(null)
    const [textUpdate, setTextUpdate] = useState(null)

    const deleteItem = ()=>{
        let noteItem = firebase.database().ref('notesDb').child(location.state.id)
        noteItem.remove();
    }
    function updateItem(){
        let noteItem = firebase.database().ref('notesDb').child(location.state.id)
        if (titreUpdate !==null ){
            noteItem.update({
                titre:titreUpdate
            })
        }
        if (textUpdate !== null) {
            noteItem.update({
                text:textUpdate
            })
        }
    }
    return (
        <div>
            <input defaultValue={location.state.titre} placeholder="Titre" onChange={(e)=> {setTitreUpdate(e.target.value)}} type="text" />
            <textarea defaultValue={location.state.text} placeholder="Text" onChange={(e)=> {setTextUpdate(e.target.value)}}  />
            <button onClick={updateItem}>Sauvegarder</button>    
            <button onClick={deleteItem}>Delete</button>      
        </div>
    );
};

export default UpdatePage;