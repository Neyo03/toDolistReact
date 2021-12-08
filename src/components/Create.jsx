import React, { useContext, useEffect, useState } from 'react';
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
        setTitre('')
        setText('')
        document.getElementsByClassName('Note_create_text')[0].innerHTML = "";
        notesDb.limitToLast(1).once('value').then((querySnapshot) => {
            console.log(querySnapshot.key);
        })
        
    }
    return (
        <div className="Note_create">
            <form className="Note_create_form" onSubmit={createNote} method="post">
                <input value={titre} placeholder="Titre" onChange={(e)=> {setTitre(e.target.value)}} type="text" />
                <span className="Note_create_text" role="textbox" contentEditable="true" onInput={(e)=> {setText(e.target.outerText)}}></span>
                <div className="Note_create_button">
                    <button >SAUVEGARDER</button>
                </div>
                
            </form>
        </div>
    );
};

export default Create;