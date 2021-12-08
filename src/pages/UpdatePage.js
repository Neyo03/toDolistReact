import React, { useEffect, useState } from 'react';

import firebase from '../api/fireBaseConfig';
import { useParams } from 'react-router';
const UpdatePage = () => {

    const param = useParams();
    const [titreUpdate, setTitreUpdate] = useState("")
    const [textUpdate, setTextUpdate] = useState("")
    const [data, setData] = useState({});
    const [error, setError] = useState('')

    // const note = firebase.database().ref('notesDb').child(param.id)
    useEffect(()=>{
        const dbRef = firebase.database().ref("notesDb");
            dbRef.child(param.id).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            setData(snapshot.val())
        } else {
            setError("No data available");
        }
        }).catch((error) => {
            setError(error);
        });
    },[])

    useEffect(()=>{
        updateItem()
    },[textUpdate,titreUpdate])
    
    const deleteItem = ()=>{
        let noteItem = firebase.database().ref('notesDb').child(param.id)
        noteItem.remove();
        window.location ="/"
    }
    function updateItem(){
        let noteItem = firebase.database().ref('notesDb').child(param.id)
        if (titreUpdate !=="" ){
             noteItem.update({
                titre:titreUpdate
            })
        }
        if (textUpdate !== "") {
             noteItem.update({
                text:textUpdate
            })  
        }
    }


    return (
        <div> 
            <div>{error}</div>
            <input defaultValue={data.titre} placeholder="Titre" onChange={(e)=> {setTitreUpdate(e.target.value)}} type="text" />
            <textarea defaultValue={data.text} placeholder="Text" onChange={(e)=> {setTextUpdate(e.target.value)}}  />
            
        </div>
    );
};

export default UpdatePage;