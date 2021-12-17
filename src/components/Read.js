import React, { useContext, useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import Display from './Display';
import Message from './Message';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';
import SelectedNotesComponent from './SelectedNotes';

const Read = () => {
    const [noteList, setNoteList]=useState([])
    const [searchValue, setSearchValue] = useState('')
    const [limitNotes, setLimitNotes] =useState(20)
    const [maxLimitNotes, setMaxLimitNotes] = useState(0)

    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)
    
    // document.addEventListener("selectionchange",(event)=>{
    //     let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
    //     
    // })
    
    document.onwheel=() =>{
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const nbNotesIncrement = maxLimitNotes > limitNotes + 20 ? limitNotes + 20 : limitNotes + (maxLimitNotes-limitNotes + 20) 
            setLimitNotes(nbNotesIncrement) 
        }  
        var body = document.body; //IE 'quirks'
        var documentBody = document.documentElement; //IE with doctype
        documentBody = (documentBody.clientHeight) ? documentBody : body;
        if (documentBody.scrollTop === 0) {
            let nbRestant = limitNotes-20;
            setLimitNotes(limitNotes-nbRestant) 
        }          
    }
    
    useEffect(()=>{
        
        document.getElementsByClassName('Header_search_bar')[0].addEventListener('input', (e)=>{
            setSearchValue(e.target.value)
            e.stopPropagation()
        })

        const notesDb = window.location.pathname ==="/archive" ? firebase.database().ref('notesDbArchive') : window.location.pathname ==="/corbeille" ? firebase.database().ref('notesDbCorbeille') : firebase.database().ref('notesDb')  
        
        const dbMethod = searchValue !=='' ? notesDb.orderByChild('titre').startAt(searchValue).endAt(searchValue+"\uf8ff") : notesDb.limitToFirst(limitNotes)
        firebase.database().ref('notesDb').on('value', (snapshot)=>{
            setMaxLimitNotes(snapshot.numChildren());
        })
        dbMethod.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            let list =[];
            for (let id in previousList) {
                list.push({id,...previousList[id]})  
            }
            setNoteList(list) 
        }) 
        
        
    }, [searchValue, reload.reload, limitNotes, maxLimitNotes])
    return (
        <div className="Read">
            
            {
                noteList && noteList.map((note,index )=>(
                    
                    <Display key={index} number={index} note={note} />
                )) 
            }
            <Message message={message.message} type={message.typeMessage} />
            <SelectedNotesComponent/>
        </div>
    );
};

export default Read;