import React, { useContext, useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import { useParams } from 'react-router';
import Burger from '../components/Burger';
import Message from '../components/Message';
import MessageContext from '../context/MessageContext';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UpdatePage = () => {

    const param = useParams();

    const [titreUpdate, setTitreUpdate] = useState("")
    const [textUpdate, setTextUpdate] = useState("")
    const [data, setData] = useState(null);

    const message = useContext(MessageContext)

    let typingTimer;               
    const doneTypingInterval = 1000;  

    // const note = firebase.database().ref('notesDb').child(param.id)
    useEffect(()=>{
        const dbRef = firebase.database().ref("notesDb");
            dbRef.child(param.id).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            setData(snapshot.val())
            
        } else {
            message.setMessage("Aucune données disponible.");
            message.setTypeMessage('error')
        }
        }).catch((error) => {
            message.setMessage(error);
            message.setTypeMessage('error')
        });
        
    },[])
    setTimeout(() => {
        autosize()
    }, 100);
    useEffect(()=>{
        updateItem()
        autosize()
    },[textUpdate,titreUpdate])
    
    
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
             
    function autosize(){
        var el = document.getElementsByClassName('Note_update_text')[0];
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }

    function handleKeyUp() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(messageSave, doneTypingInterval);  
    }
    function handleKeyDOWN() {
        clearTimeout(typingTimer);
    }
    function messageSave () {
        message.setMessage('Note modifiée avec succès !');
        message.setTypeMessage('sucess')
    }


    return (
        
        <div className="Main">
            <Burger/>
            <div className="Main_body">
               
        {data !==null && 
            <form className="Note_update_form" method="post">
                <input defaultValue={data.titre} placeholder="Titre" onKeyUp={handleKeyUp} onKeyDown={handleKeyDOWN} onChange={(e)=> {setTitreUpdate(e.target.value)}} type="text" />
                <textarea 
                    onKeyUp={handleKeyUp} 
                    onKeyDown={handleKeyDOWN}
                    className="Note_update_text" 
                    defaultValue={data.text} 
                    placeholder="Text" 
                    onChange={
                        (e)=> {
                            setTextUpdate(e.target.value)
                            autosize()
                        }

                    }  />
                <div className="Note_create_buttons">
                    <div className="Note_create_button">
                        <FontAwesomeIcon className="Note_icon" onClick={()=>{
                            updateItem()
                            messageSave()
                        }} icon={faSave} />
                    </div>
                </div>
            </form>
        }   
            </div>
            <Message message={message.message} type={message.typeMessage} />
        </div>
        
    );
};

export default UpdatePage;