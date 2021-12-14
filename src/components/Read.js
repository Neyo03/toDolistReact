import React, { useContext, useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import Display from './Display';
import Message from './Message';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';

const Read = () => {
    const [noteList, setNoteList]=useState([])
    const [searchValue, setSearchValue] = useState('')
    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)
    console.log(reload);

   

    useEffect(()=>{
        document.getElementsByClassName('Header_search_bar')[0].addEventListener('input', (e)=>{
            setSearchValue(e.target.value)
            e.stopPropagation()
        })

        const notesDb = window.location.pathname ==="/archive" ? firebase.database().ref('notesDbArchive') : window.location.pathname ==="/corbeille" ? firebase.database().ref('notesDbCorbeille') : firebase.database().ref('notesDb')  

        const dbMethod = searchValue !=='' ? notesDb.orderByChild('titre').startAt(searchValue).endAt(searchValue+"\uf8ff") : notesDb

        dbMethod.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            let list =[];
            for (let id in previousList) {
                list.push({id,...previousList[id]})  
            }
            setNoteList(list) 
        }) 
        
    }, [searchValue, reload.reload])
    return (
        <div className="Read">
            {
                noteList && noteList.map((note,index )=>(
                    
                    <Display key={index} number={index} note={note} />
                )) 
            }
            <Message message={message.message} type={message.typeMessage} />
        </div>
    );
};

export default Read;