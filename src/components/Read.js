import React, { useContext, useEffect, useState } from 'react';
import firebase from '../api/fireBaseConfig';
import Display from './Display';
import Message from './Message';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';
import SelectedNotesComponent from './SelectedNotes';
import { UIdContext } from '../context/UIdContext';
import LibelleFile from './LibelleFile';
import { faBan, faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Read = () => {
    const [noteList, setNoteList]=useState([])
    const [searchValue, setSearchValue] = useState('')
    const [limitNotes, setLimitNotes] =useState(20)
    const [maxLimitNotes, setMaxLimitNotes] = useState(0)

    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)
    const uid = useContext(UIdContext)
    
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

        const notesDb = window.location.pathname ==="/archive" ? firebase.database().ref('notesDbArchive') : window.location.pathname ==="/corbeille" ? firebase.database().ref('notesDbCorbeille') : window.location.pathname ==="/libelle" ? firebase.database().ref('libelleDb') : firebase.database().ref('notesDb')  

        const dbMethod = searchValue !=='' ? notesDb.orderByChild('titre').startAt(searchValue).endAt(searchValue+"\uf8ff").limitToFirst(limitNotes) : notesDb.limitToFirst(limitNotes)
        notesDb.on('value', (snapshot)=>{
            setMaxLimitNotes(snapshot.numChildren());
        })
        dbMethod.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            let list =[];
           
            for (let id in previousList) {
                
                if (previousList[id].uid === uid) {

                    if (previousList[id].libelle) {
                        
                        firebase.database().ref('libelleDb').on('value', (snapshot) =>{
                            for (let j = 0; j < previousList[id].libelle.length; j++) {
                                const elementTB = previousList[id].libelle[j];
                                let noteItem =  firebase.database().ref('notesDb').child(id) 
                                if (snapshot.val()) {
                                    if (snapshot.val()[elementTB.id] === undefined) {
                                        console.log(previousList[id].libelle);
                                        previousList[id].libelle.splice(j, 1)
                                        noteItem.update(previousList[id])
                                    }
                                }
                                else{
                                    previousList[id].libelle = []
                                    noteItem.update(previousList[id])
                                }
                            } 
                        })
                    } 
                    list.push({id,...previousList[id]})  
                }
            }
            setNoteList(list) 
        }) 
        
        
    }, [searchValue, reload.reload, limitNotes, maxLimitNotes])

    return (
        <div className="Read">

            {
                noteList.length>0 ? noteList.map((note,index )=>(
                    window.location.pathname !=="/libelle" ? <Display key={index} number={index} note={note} /> : <LibelleFile key={index} number={index} libelle={note}/>
                )) : <div className='Read_emptydata'>
                   <FontAwesomeIcon icon={faBan}/>
                    Aucune donn??e
                </div>
            }
            <Message message={message.message} type={message.typeMessage} />
            <SelectedNotesComponent/>
        </div>
    );
};

export default Read;