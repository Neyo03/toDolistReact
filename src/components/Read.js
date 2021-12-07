import React, { useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import Create from './Create';
import UpdateDelete from './Display';


const Read = () => {
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
        <div>
            <Create/>
            {
                noteList && noteList.map((note,index )=>(
                    <UpdateDelete key={index} note={note} />
                )) 
            }
        </div>
    );
};

export default Read;