import React, { useContext } from 'react';
import firebase from '../api/fireBaseConfig';
import MessageContext from '../context/MessageContext';
const MenuEllipsV = ({note, className, type}) => {

    const message = useContext(MessageContext)

    const nouvelleNote = {
        uid : note.uid ,
        titre : note.titre, 
        text :  note.text,
        color : note.color,
        archive : note.archive,
        corbeille : !note.corbeille
    }

    const deleteItem = (e)=>{
        e.target.parentElement.parentElement.parentElement.style.transition ="0.3s"
        e.target.parentElement.parentElement.parentElement.style.opacity ="0"
        let noteItem = note.corbeille ? firebase.database().ref('notesDbCorbeille').child(note.id) : note.archive ? firebase.database().ref('notesDbArchive').child(note.id) : firebase.database().ref('notesDb').child(note.id);
        
        if ( note.corbeille ) {
            message.setMessage('La note a été supprimée avec succès.') 
            message.setTypeMessage("sucess")
        }
        else{
            message.setMessage('Note placée dans la corbeille.') 
            message.setTypeMessage("sucess")
        }
        
        
        const notesDb = note.corbeille ? firebase.database().ref('notesDb') : firebase.database().ref('notesDbCorbeille')

        !note.corbeille && notesDb.push(nouvelleNote)

        setTimeout(() => {
            noteItem.remove();
            e.target.parentElement.parentElement.parentElement.style.opacity ="1"
        },100);
     
    }

    const restaureItem = (e)=>{

        let noteItem = firebase.database().ref('notesDbCorbeille').child(note.id);
        
        message.setMessage('Note restaurée') 
        message.setTypeMessage("sucess")
        
        
        e.target.parentElement.parentElement.parentElement.style.transition ="0.3s"
        e.target.parentElement.parentElement.parentElement.style.opacity ="0"

        const notesDb = firebase.database().ref('notesDb')

        notesDb.push(nouvelleNote)

        setTimeout(() => {
            noteItem.remove();
            e.target.parentElement.parentElement.parentElement.style.opacity ="1"
        }, 100);

    }
    const copieItem = ()=>{
        const noteDb = note.archive ? firebase.database().ref('notesDbArchive') : firebase.database().ref('notesDb')
        noteDb.push({
            uid : note.uid ,
            titre : note.titre, 
            text :  note.text,
            color : note.color,
            archive : note.archive,
            corbeille : note.corbeille
        })
        message.setMessage('Note copiée.') 
        message.setTypeMessage("sucess")
    }
    const changeColor = (color)=>{
        let noteItem = note.archive ? firebase.database().ref('notesDbArchive').child(note.id) : firebase.database().ref('notesDb').child(note.id);
        if (color ){
             noteItem.update({
                color : color
            })
        }
        
    }

    
    return (
        type === "colors" ?
        <div className={`MenuColors ${className}`}>
            <button style={ note.color=== '#A0937D' ? {backgroundColor: 'rgb(61, 61, 61)'} : null}  onClick={()=>changeColor('#A0937D')}> <div title="BRUN" style={{backgroundColor: '#A0937D' }} ></div>  </button> 
            <button style={ note.color=== '#BFA2DB' ? {backgroundColor: 'rgb(61, 61, 61)'} : null}  onClick={()=>changeColor('#BFA2DB')}> <div title="VIOLET" style={{backgroundColor: '#BFA2DB'  }} ></div>  </button> 
            <button style={ note.color=== '#3A6351' ? {backgroundColor: 'rgb(61, 61, 61)'} : null}  onClick={()=>changeColor('#3A6351')}>  <div title="VERT" style={{backgroundColor: '#3A6351' }} ></div> </button> 
            <button style={ note.color=== '#FF7878' ? {backgroundColor: 'rgb(61, 61, 61)'} : null}  onClick={()=>changeColor('#FF7878')}> <div title="ROUGE" style={{backgroundColor: '#FF7878' }} ></div>  </button> 
        </div>
        : <div className={`MenuEllipsV ${className}`}>
            <button 
            onClick=
            {
                (e)=>{
                    deleteItem(e)
                }
            }> {note.corbeille ? 'Supprimer définitivement' : 'Supprimer la note'}</button> 
            {note.corbeille && 
                <button 
                    onClick={(e)=>restaureItem(e)}
                >Restaurer la note</button>  }
                        
            {!note.corbeille && <button onClick={copieItem}>Effectuer une copie</button> }
            
            {!note.corbeille && <button onClick={copieItem}>Ajouter un libellé</button> }
            
        </div>
    );
};

export default MenuEllipsV;