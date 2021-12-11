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
    const [data, setData] = useState({});
    const message = useContext(MessageContext)

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
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }


    return (
        
        <div className="Main">
            <Burger/>
            <div className="Main_body">
               
                
            <form className="Note_update_form" method="post">
                <input defaultValue={data.titre} placeholder="Titre" onChange={(e)=> {setTitreUpdate(e.target.value)}} type="text" />
                <textarea 
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
                        <FontAwesomeIcon className="Note_icon" onClick={updateItem} icon={faSave} />
                    </div>
                </div>
            </form>

            </div>
        </div>
        
    );
};

export default UpdatePage;