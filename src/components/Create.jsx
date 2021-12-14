import React, { useContext, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { UIdContext } from '../context/UIdContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';

const Create = () => {
    const [titre, setTitre]  =useState('')
    const [text, setText] =useState('')
    const uid = useContext(UIdContext)
    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


    const createNote = (e)=>{
        
        e.preventDefault()
        const notesDb = firebase.database().ref('notesDb')
        const note = {
            uid,
            titre,
            text,
            color : "default",
            archive : false, 
            corbeille : false, 
            dateNote : date
        }
        if(text !==""){ 
            notesDb.push(note)
            message.setMessage('Note créée.') 
            message.setTypeMessage('sucess')
        }else{
            message.setMessage('Impossible de créer une note avec un text vide.') 
            message.setTypeMessage('error')
        }
        
        setTitre('')
        setText('')
        document.getElementsByClassName('Note_create_text')[0].innerHTML = "";
        setTimeout(() => {
            reload.setReload(!reload.reload)
        }, 100);
        
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
                <div className="Note_create_buttons">
                    <div className="Note_create_button">
                        <FontAwesomeIcon className="Note_icon" onClick={createNote} icon={faSave} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Create;