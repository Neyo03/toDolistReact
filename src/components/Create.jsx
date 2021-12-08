import React, { useContext, useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { UIdContext } from '../context/UIdContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    function handleClick(e) {
        
        if (e.target.placeholder === "Titre") {
            e.target.placeholder = "Ajouter une note..."
        }
        else{
            e.target.placeholder = "Titre"
        }
        document.getElementsByClassName('Note_create_form')[0].classList.toggle('Note_create_form_open');
    }
    return (
        <div className="Note_create">
            <form className="Note_create_form" onSubmit={createNote} method="post">
                <input value={titre} placeholder="Ajouter une note..." onClick={(e)=>handleClick(e)} onChange={(e)=> {setTitre(e.target.value)}} type="text" />
                <span className="Note_create_text" role="textbox" contentEditable="true" onInput={(e)=> {setText(e.target.outerText)}}></span>
                <div className="Note_create_button">
                    <FontAwesomeIcon className="Note_icon" icon={faSave} />
                </div>
                
            </form>
        </div>
    );
};

export default Create;