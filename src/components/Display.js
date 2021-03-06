import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faArchive, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UIdContext } from '../context/UIdContext';
import MenuEllipsV from './Menu';
import firebase from '../api/fireBaseConfig';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';

const Display = ({note, number}) => {

    const [openMenu, setOpenMenu] = useState(false)
    const [openMenuColors, setOpenMenuColors] = useState(false)
   
    const uid = useContext(UIdContext)
    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();



    useEffect(()=>{
        if (window.location.pathname ==="/corbeille" && note.dateNote+7 === date ) {
            let noteItem = firebase.database().ref('notesDbCorbeille').child(note.id);
            noteItem.remove()
        }
        //Ajout du text de la note directement dans sa balise <p> pour que les <br> s'affiche correctement
       
        document.getElementsByClassName('textNote')[number].innerHTML = nl2br(note.text.substr(0, 500))

        
        
    },[note, reload.reload])

    function handleOver(index) {
        document.getElementsByClassName('Note_icons')[index].classList.toggle('Note_icons_hover')
    }
    
    function nl2br (str, is_xhtml) {   
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    }

    function handleArchive(e) {
        let noteItem = note.archive ? firebase.database().ref('notesDbArchive').child(note.id) : firebase.database().ref('notesDb').child(note.id);
       
        const nouvelleNote = {
            uid : note.uid ,
            titre : note.titre, 
            text :  note.text,
            color : note.color,
            archive : !note.archive,
            corbeille : note.corbeille, 
            dateNote: note.dateNote,
        }
        
        if ( note.archive ) {
            message.setMessage('Note restaur??e') 
            message.setTypeMessage("sucess")
        }
        else{
            message.setMessage('Note archiv??e') 
            message.setTypeMessage("sucess")
        }
        
        e.target.parentElement.parentElement.parentElement.style.transition ="0.3s"
        e.target.parentElement.parentElement.parentElement.style.opacity ="0"
        const notesDb = note.archive ? firebase.database().ref('notesDb') : firebase.database().ref('notesDbArchive')
        notesDb.push(nouvelleNote)
        setTimeout(() => {
            reload.setReload(!reload.reload)
            noteItem.remove();
            if (e.target.parentElement.parentElement.parentElement) {
                e.target.parentElement.parentElement.parentElement.style.opacity ="1"
            }
            
            
        }, 100);
    }
    
   
    document.getElementsByClassName('Read')[0].addEventListener("mouseover",(e)=>{
    
        if (e.target.classList.contains("Note") && openMenu===true ) {
            setOpenMenu(false)
        }
        if (e.target.classList.contains("Note") && openMenuColors===true) {
            setOpenMenuColors(false)
        }
    })
    
    return (
        <div className="Note" id={note.id} style={ note.color !== "default" ? { backgroundColor : note.color, transition: ".3s linear", border: "none"}: null} onMouseOver={()=>handleOver(number)} onMouseOut={()=>handleOver(number)} >
            {note.libelle && <div className='Note_libelle'>
                <span>{note.libelle.length > 0 && note.libelle[0].titre}</span>
                {note.libelle.length > 1 && <span> {note.libelle[1].titre }</span>}
                {note.libelle.length > 2 && <span>{note.libelle[2].titre}</span>}
                {note.libelle.length > 3 ? <span>+{note.libelle.length-3}</span> : ''}
            </div>}
            <Link to={
                note.archive ? '' :
                note.corbeille ? '' :
                "/updateNote/"+note.id

                }
            >
                <h3>{note.titre.substr(0, 30)} {note.titre ? '...' : ''}</h3>
                <p className='textNote'></p>   
            </Link>
        <div className="Note_icons">
            {!note.corbeille && <FontAwesomeIcon 
                className="Note_icon" 
                onClick={(e)=>{handleArchive(e)}} 
                onMouseOver={()=>{
                    setOpenMenuColors(false) 
                    setOpenMenu(false)
                }} 
                icon={faArchive} 
            />}
            {!note.corbeille && <FontAwesomeIcon 
                className="Note_icon" 
                onMouseOver={()=>
                    {
                        setOpenMenuColors(true) 
                        setOpenMenu(false)
                    }
                } 
                icon={faPalette} />}
            <MenuEllipsV type={'colors'} className={openMenuColors ? 'MenuColors_open' : ''}  note={note}/>
            <FontAwesomeIcon 
            className="Note_icon" 
            onMouseOver={()=>
                {
                    setOpenMenu(true)
                    setOpenMenuColors(false)

                }
            } 
            icon={faEllipsisV} />
            <MenuEllipsV type={'menuEllips'} className={openMenu ? 'MenuEllipsV_open' : ''} note={note}/>
            <MenuEllipsV type={''} note={note}/>

        </div>
        
    </div> 
        
    );
};

export default Display;