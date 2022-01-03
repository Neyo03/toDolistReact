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
    const [openMenu, setOpenMenu] = useState(false)
    const [openMenuColors, setOpenMenuColors] = useState(false)

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
                    element.children[0].classList.remove('Libelle_selected') 
                    let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
                    menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')
                    setOpenMenu(false)
                    setOpenMenuColors(false)
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
                if (e.target.classList.contains ('Libelle_file') && pressing ) { 
                    console.log(e.target.children[0].classList.add('Libelle_selected') );
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
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')
        if (selectedNotes.length>0) {
          menuSelectedNotes.classList.add('SelectedNotes_menuSelectedNotes_open')
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

    function handleRestaureAllNotes() {
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')

        for (let index = 0; index < selectedNotes.length; index++) {
            const noteDiv = selectedNotes[index];
            noteDiv.style.opacity ="0"
            noteDiv.style.transition ="0.3s"
            let noteItem = firebase.database().ref('notesDbCorbeille').child(noteDiv.id)
    
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
                const notesDb =  firebase.database().ref('notesDb');

                notesDb.push(nouvelleNote)

                setTimeout(() => {
                    reload.setReload(!reload.reload)
                    noteItem.remove().then(()=>{
                       
                        selectedNotes.length > 1 ? message.setMessage(selectedNotes.length +' notes restaurées.') : message.setMessage(selectedNotes.length +' note restaurée.')
                        message.setTypeMessage("sucess")
                        
                    }).catch(()=>{
                        message.setMessage('Restauration impossible.') 
                        message.setTypeMessage("error")
                    });
                    noteDiv.style.opacity ="1"
                    
                }, 100);  
            })
            
        }
    }
    function handleAllDelete() {
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')

        for (let index = 0; index < selectedNotes.length; index++) {
            const noteDiv = selectedNotes[index];
            console.log(noteDiv);
            noteDiv.style.opacity ="0"
            noteDiv.style.transition ="0.3s"
            let noteItem;
            
           firebase.database().ref('notesDb').child(noteDiv.id).once('value').then(res => {
                if (res.val() === null && window.location.pathname !=='/archive' &&  window.location.pathname !=='/libelle' ) {
                    noteItem = firebase.database().ref('notesDbCorbeille').child(noteDiv.id)
                }
                else if(res.val() === null && window.location.pathname ==='/archive' &&  window.location.pathname !=='/libelle' ){
                    noteItem = firebase.database().ref('notesDbArchive').child(noteDiv.id)
                }
                else if (res.val() === null  &&  window.location.pathname ==='/libelle') {
                    console.log('salut');
                    noteItem = firebase.database().ref('libelleDb').child(noteDiv.id)
                }
                else{
                    noteItem = firebase.database().ref('notesDb').child(noteDiv.id)
                }
                
                noteItem.once('value', snapshot=>{
                    let note = snapshot.val();
                    console.log(note);
                   
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
                    if (window.location.pathname !=='/libelle' && !note.corbeille) {
                        notesDb.push(nouvelleNote)
                    }

                    setTimeout(() => {
                        reload.setReload(!reload.reload)
                        noteItem.remove().then(()=>{
                            if ( note.corbeille ) {
                                selectedNotes.length > 1 ? message.setMessage(selectedNotes.length+' notes supprimées définitivement.') : message.setMessage(selectedNotes.length+' note supprimée définitivement.')
                                message.setTypeMessage("sucess")
                            }
                            else if(!note.corbeille && window.location.pathname !=='/libelle'){
                                selectedNotes.length > 1 ? message.setMessage(selectedNotes.length +' notes placées dans la corbeille.') : message.setMessage(selectedNotes.length +' note placée dans la corbeille.')
                                message.setTypeMessage("sucess")
                            }
                            else if( window.location.pathname ==='/libelle'){
                                selectedNotes.length > 1 ? message.setMessage(selectedNotes.length +' libellés supprimés.') : message.setMessage(selectedNotes.length +' libellé supprimé.')
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
    function changeAllcolors(color) {
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')
        for (let index = 0; index < selectedNotes.length; index++) {
            const noteDiv = selectedNotes[index];
            let noteItem;
           
           firebase.database().ref('notesDb').child(noteDiv.id).once('value').then(res => {
                if(res.val() === null && window.location.pathname ==='/archive' ){
                    noteItem = firebase.database().ref('notesDbArchive').child(noteDiv.id)
                }
                else{
                    noteItem = firebase.database().ref('notesDb').child(noteDiv.id)
                }
                noteItem.once('value', snapshot=>{
                    let note = snapshot.val();
                    setTimeout(() => {
                        reload.setReload(!reload.reload)
                        noteItem.update({
                            color : color === note.color ? 'default' : color
                        })
                        
                        
                    }, 100);  
                })
            })
        }
    }
    function handleCopieAllNotes() {
        let menuSelectedNotes = document.querySelector('.SelectedNotes_menuSelectedNotes')
        menuSelectedNotes.classList.remove('SelectedNotes_menuSelectedNotes_open')

        for (let index = 0; index < selectedNotes.length; index++) {
            const noteDiv = selectedNotes[index];
            let noteItem;
           
           firebase.database().ref('notesDb').child(noteDiv.id).once('value').then(res => {
                if(res.val() === null && window.location.pathname ==='/archive' ){
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
                        archive : note.archive,
                        corbeille : note.corbeille, 
                        dateNote: note.dateNote
                    }
                    const notesDb = note.archive ? firebase.database().ref('notesDbArchive') : firebase.database().ref('notesDb')


                    setTimeout(() => {
                        reload.setReload(!reload.reload)
                        notesDb.push(nouvelleNote).then(()=>{
                           
                            selectedNotes.length > 1 ? message.setMessage(selectedNotes.length +' notes copiées.') : message.setMessage(selectedNotes.length +' note copiée.')
                            message.setTypeMessage("sucess")
                            
                        }).catch(()=>{
                            message.setMessage('Copie impossible.') 
                            message.setTypeMessage("error")
                        });
                        
                    }, 100);  
                })
            })
        }
    }
    document.body.addEventListener("mouseover",(e)=>{
        if (e.target.classList.contains("SelectedNotes_menuSelectedNotes") || e.target.classList.contains("Main") && openMenu===true ) {
            setOpenMenu(false)
        }
        if (e.target.classList.contains("SelectedNotes_menuSelectedNotes") || e.target.classList.contains("Main") && openMenuColors===true) {
            setOpenMenuColors(false)
        }
    })

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
                    window.location.pathname ==='/corbeille' ? '' : window.location.pathname ==='/libelle' ? '' : 
                    <FontAwesomeIcon
                        className="SelectedNotes_icon" 
                        icon={faArchive} 
                        onMouseOver={()=>
                            {
                            setOpenMenu(false)
                            setOpenMenuColors(false)
                            }
                        }
                        onClick={()=>
                            {
                                handleAllArchive()
                            }
                        }
                    />
                }
                {window.location.pathname ==='/corbeille' ? '' : window.location.pathname ==='/libelle' ? '' :  <FontAwesomeIcon
                    className="SelectedNotes_icon" 
                    icon={faPalette} 
                    onMouseOver={()=>
                        {
                           setOpenMenu(false)
                           setOpenMenuColors(true)
                        }
                    }
                />}
                <div className={`SelectedNotes_MenuColors ${openMenuColors ? 'SelectedNotes_MenuColors_open' : '' }`}>
                    <button  onClick={()=>changeAllcolors('#A0937D')}> <div title="BRUN" style={{backgroundColor: '#A0937D' }} ></div>  </button> 
                    <button  onClick={()=>changeAllcolors('#BFA2DB')}> <div title="VIOLET" style={{backgroundColor: '#BFA2DB'  }} ></div>  </button> 
                    <button  onClick={()=>changeAllcolors('#3A6351')}>  <div title="VERT" style={{backgroundColor: '#3A6351' }} ></div> </button> 
                    <button onClick={()=>changeAllcolors('#FF7878')}> <div title="ROUGE" style={{backgroundColor: '#FF7878' }} ></div>  </button> 
                </div>
                <FontAwesomeIcon
                    className="SelectedNotes_icon" 
                    icon={faEllipsisV} 
                    onMouseOver={()=>
                        {
                           setOpenMenu(true)
                           setOpenMenuColors(false)
                        }
                    }
                    
                />
                <div className={`SelectedNotes_MenuEllipsV ${openMenu ? 'SelectedNotes_MenuEllipsV_open' : '' }`}>
                    <button 
                    onClick=
                    {
                        ()=>{
                            handleAllDelete()
                        }
                    }> 
                        {window.location.pathname ==='/corbeille' ? 'Supprimer définitivement' : window.location.pathname !=='/libelle' ? 'Supprimer les notes' : 'Supprimer les libellés'}
                    </button> 
                    {window.location.pathname ==='/corbeille' && 
                        <button 
                        onClick={handleRestaureAllNotes}
                        >Restaurer les notes</button>  }
                                
                    {window.location.pathname ==='/corbeille' ? '' : window.location.pathname ==='/libelle' ? <button style={{visibility : 'hidden'}}>Effectuer une copie</button> : <button onClick={handleCopieAllNotes}>Effectuer une copie</button> }
                    
                    {window.location.pathname ==='/corbeille' ? '' : window.location.pathname ==='/libelle' ? '' : <button>Ajouter un libellé</button> }
                    
                </div>
           </div>
           

        </div>
    );
};

export default SelectedNotesComponent;