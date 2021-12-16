import { faArchive, faEllipsisV, faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import MenuEllipsV from './Menu';
import firebase from '../api/fireBaseConfig';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';

const SelectedNotesComponent = () => {
    
    let listSelectedNotes=[]
    const [selectedNotes, setSelectedNotes] = useState([]);
    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)
  
    useEffect(()=>{
      
      let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
      let hightLightDiv= document.createElement('div');
      let pressing = false;
      let wheel = false 
      
      
        function reCalc() {
            var x3 = Math.min(x1,x2); //Smaller X
            var x4 = Math.max(x1,x2); //Larger X
            var y3 = Math.min(y1,y2); //Smaller Y
            var y4 = Math.max(y1,y2); //Larger Y
            hightLightDiv.style.left = x3 + 'px';
            hightLightDiv.style.top = y3 + 'px';
            hightLightDiv.style.width = x4 - x3 + 'px';
            hightLightDiv.style.height = y4 - y3 + 'px';
        }
        document.addEventListener('wheel', e=>{
            console.log(e);
            console.log(e);
            if (e.wheelDeltaY > 0) {
                wheel = false
            }
            else {
                wheel = true
                y2 = e.pageY; //Update the current position Y
                reCalc();
            }
            
            
        });
        document.addEventListener('mousedown', e=>{ 
           
            pressing =true;
            setSelectedNotes(listSelectedNotes)
            setTimeout(() => {
                for (let s = 0; s < listSelectedNotes.length; s++) {
                    let element = listSelectedNotes[s]
                    element.classList.remove('Note_selected') 
                }
                listSelectedNotes = []
            }, 200);
            
    
            x1 = e.clientX; 
            y1 = e.clientY; 
            reCalc();
    
            hightLightDiv.classList.add('hightLightSelection')
            document.body.append(hightLightDiv)
            
        
            document.addEventListener('mousemove', e=>{  
                if(!wheel){   //If the user isn't scrolling
                    y2 = e.clientY; //Update the current position Y
                }
                x2 = e.clientX; //Update the current position X
                reCalc();

                if (e.target.classList[0] ==='Note' && pressing ) { 
                    e.target.classList.add('Note_selected') 
                    if (!listSelectedNotes.includes(e.target)) {
                        listSelectedNotes.push(e.target)
                    }
                }
                e.stopPropagation()
            })
            document.addEventListener('mouseup', e=>{
                pressing = false
                setSelectedNotes(listSelectedNotes)
                hightLightDiv.remove() 
                e.stopPropagation()
            })
            
        })
     
    },[])
  
    useEffect(()=>{
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        if (selectedNotes.length>0) {
          menuSelectedNotes.classList.add('SelectedNotes_menuSelectedNotes_open')
        }
        else{
          menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')
        }
    },[selectedNotes])

    function handleAllArchive() {
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')

        for (let index = 0; index < selectedNotes.length; index++) {
            const noteDiv = selectedNotes[index];
            noteDiv.style.opacity ="0"
            noteDiv.style.transition ="0.3s"
            let noteItem;
            firebase.database().ref('notesDb').child(noteDiv.id).once('value').then(res => {
                noteItem = res.val() === null ? firebase.database().ref('notesDbArchive').child(noteDiv.id) : firebase.database().ref('notesDb').child(noteDiv.id)
                noteItem.once('value', snapshot=>{
                    let note = snapshot.val();
                    const nouvelleNote = {
                        uid : note.uid ,
                        titre : note.titre, 
                        text :  note.text,
                        color : note.color,
                        archive : !note.archive,
                        corbeille : note.corbeille, 
                        dateNote: note.dateNote
                    }
                    if ( note.archive ) {
                        selectedNotes.length > 1 ? message.setMessage(selectedNotes.length+' notes restaurées') : message.setMessage(selectedNotes.length+' note restaurée')
                        message.setTypeMessage("sucess")
                    }
                    else{
                        selectedNotes.length > 1 ? message.setMessage(selectedNotes.length +' notes archivées') : message.setMessage(selectedNotes.length +' note archivée')
                        message.setTypeMessage("sucess")
                    }
    
                    const notesDb = note.archive ? firebase.database().ref('notesDb') : firebase.database().ref('notesDbArchive')
                    notesDb.push(nouvelleNote)
                    setTimeout(() => {
                        reload.setReload(!reload.reload)
                        noteItem.remove();
                        noteDiv.style.opacity ="1"
                        
                    }, 100);  
                })
            })
        }
    }

    function handleAllDelete() {
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')

        for (let index = 0; index < selectedNotes.length; index++) {
            const noteDiv = selectedNotes[index];
            noteDiv.style.opacity ="0"
            noteDiv.style.transition ="0.3s"
            let noteItem;
           
           firebase.database().ref('notesDb').child(noteDiv.id).once('value').then(res => {
                if (res.val() === null && window.location.pathname !=='/archive' ) {
                    noteItem = firebase.database().ref('notesDbCorbeille').child(noteDiv.id)
                }
                else if(res.val() === null && window.location.pathname ==='/archive' ){
                    noteItem = firebase.database().ref('notesDbArchive').child(noteDiv.id)
                }
                else{
                    noteItem = firebase.database().ref('notesDb').child(noteDiv.id)
                }
                noteItem.once('value', snapshot=>{
                    let note = snapshot.val();
                    const nouvelleNote = {
                        uid : note.uid ,
                        titre : note.titre, 
                        text :  note.text,
                        color : note.color,
                        archive : false,
                        corbeille : !note.corbeille, 
                        dateNote: note.dateNote
                    }
                    const notesDb = note.corbeille ? firebase.database().ref('notesDb') : firebase.database().ref('notesDbCorbeille')

                    !note.corbeille && notesDb.push(nouvelleNote)

                    setTimeout(() => {
                        reload.setReload(!reload.reload)
                        noteItem.remove().then(()=>{
                            if ( note.corbeille ) {
                                selectedNotes.length > 1 ? message.setMessage(selectedNotes.length+' notes supprimées définitivement.') : message.setMessage(selectedNotes.length+' note supprimée définitivement.')
                                message.setTypeMessage("sucess")
                            }
                            else{
                                selectedNotes.length > 1 ? message.setMessage(selectedNotes.length +' notes placées dans la corbeille.') : message.setMessage(selectedNotes.length +' note placée dans la corbeille.')
                                message.setTypeMessage("sucess")
                            }
                        }).catch(()=>{
                            message.setMessage('Suppression impossible.') 
                            message.setTypeMessage("error")
                        });
                        noteDiv.style.opacity ="1"
                        
                    }, 100);  
                })
            })
        }
    }


    return (
        <div className='SelectedNotes_menuSelectedNotes'>
            <div>
                <FontAwesomeIcon
                    className="SelectedNotes_icon" 
                    icon={faTimes} 
                />
                <span>{selectedNotes.length>1 ? selectedNotes.length+' Notes séléctionnées' : selectedNotes.length+' Note séléctionnée'}</span>
            </div>
           
           <div>
            
            {
                window.location.pathname !=='/corbeille' &&
                <FontAwesomeIcon
                className="SelectedNotes_icon" 
                icon={faArchive} 
                onClick={()=>
                    {
                        handleAllArchive()
                    }
                }
            />
            }
            <FontAwesomeIcon
                className="SelectedNotes_icon" 
                icon={faPalette} 
            />
            <FontAwesomeIcon
                className="SelectedNotes_icon" 
                icon={faEllipsisV} 
                onClick={()=>
                    {
                        handleAllDelete()
                    }
                }
            />
           </div>
           

        </div>
    );
};

export default SelectedNotesComponent;