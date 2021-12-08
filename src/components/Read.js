import React, { useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import Create from './Create';
import Display from './Display';


const Read = React.memo(() => {
    const [noteList, setNoteList]=useState([])
    
    useEffect(()=>{
        const notesDb = firebase.database().ref('notesDb')
        notesDb.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            let list =[];
            for (let id in previousList) {
                list.push({id,...previousList[id]})  
            }
            setNoteList(list)
        })
    }, [])
    return (
        <div className="Read">
            {
                noteList && noteList.map((note,index )=>(
                    
                    <Display key={index} number={index} note={note} />
                    
                )) 
            }
        </div>
    );
});

export default Read;