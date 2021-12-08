import React from 'react';
import firebase from '../api/fireBaseConfig';
const MenuEllipsV = ({note, className}) => {

    const deleteItem = ()=>{
        let noteItem = firebase.database().ref('notesDb').child(note.id)
        noteItem.remove();
    }
    return (
        <div className={`MenuEllipsV ${className}`}>
            <button onClick={deleteItem}>Supprimer la note</button> 
            <button onClick={deleteItem}>Effectuer une copie</button> 
        </div>
    );
};

export default MenuEllipsV;