import React from 'react';
import firebase from '../api/fireBaseConfig';
const MenuEllipsV = ({note, className, type}) => {
    const color1 = 'salut'
    const deleteItem = ()=>{
        let noteItem = firebase.database().ref('notesDb').child(note.id)
        noteItem.remove();
    }
    const copieItem = ()=>{
        firebase.database().ref('notesDb').child(note.id).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                firebase.database().ref('notesDb').push(snapshot.val())
            } else {
                console.log('error');
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    const changeColor = (color)=>{
        let noteItem = firebase.database().ref('notesDb').child(note.id)
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
            <button onClick={deleteItem}>Supprimer la note</button> 
            <button onClick={copieItem}>Effectuer une copie</button> 
        </div>
    );
};

export default MenuEllipsV;