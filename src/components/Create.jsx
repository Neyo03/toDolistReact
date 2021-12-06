import React, { useContext, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import { UIdContext } from '../context/UIdContext';

const Create = () => {
    const [titre, setTitre]  =useState('')
    const [text, setText] =useState('')
    const uid = useContext(UIdContext)

    const createNote = (e)=>{
        e.preventDefault()
        const notesDb = firebase.database().ref('notesDb')
        const note = {
            uid,
            titre,
            text
        }
        if (text !==""  ) {
            notesDb.push(note)
        }
    
    }
    return (
        <div>
            <h4>Ecris une note</h4>
            <form onSubmit={createNote} method="post">
                <input value={titre} placeholder="Titre" onChange={(e)=> {setTitre(e.target.value)}} type="text" />
                <textarea value={text} placeholder="Text" onChange={(e)=> {setText(e.target.value)}}  />
                <button>SAUVEGARDER</button>
            </form>
        </div>
    );
};

export default Create;