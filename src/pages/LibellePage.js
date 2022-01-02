import { faFolder, faFolderPlus, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useContext, useEffect } from 'react/cjs/react.development';
import Burger from '../components/Burger';
import MessageContext from '../context/MessageContext';
import { ReloadReadContext } from '../context/ReloadReadAfterActions';
import { UIdContext } from '../context/UIdContext';
import firebase from '../api/fireBaseConfig';
import Message from '../components/Message';
import LibelleFile from '../components/LibelleFile';
import Read from '../components/Read';
import { useAuth } from '../context/AuthContext';

const LibellePage = () => {
    const [open, setOpen] = useState(false)
    const [titre, setTitre]  =useState('')
    const uid = useContext(UIdContext)
    const message = useContext(MessageContext)
    const reload = useContext(ReloadReadContext)
    const {currentUser} = useAuth()
    useEffect(()=>{
        if (currentUser ===null) {
            window.location.href = '/connexion'
        } 
    },[currentUser])
    function handleClick(e) {
        if (e.target.classList.contains('Libelle_form_create') || e.target.classList.contains('fa-save') ) {
            setOpen(false)
        }
        else if(!e.target.classList.contains('fa-save')){
            setOpen(true)
        }
    }
    function handleCreate() {
        const libelleDb = firebase.database().ref('libelleDb')
        const libelle = {
            uid,
            titre,
            color : "default",
        }
        if(titre !==""){ 
            libelleDb.push(libelle)
            message.setMessage('Libellé créé.') 
            message.setTypeMessage('sucess')
        }
        setTitre('')
        setTimeout(() => {
            reload.setReload(!reload.reload)
        }, 100);
    }
    return (
        <div className='Libelle' >
            <Burger/>
            {currentUser && <div className='Libelle_body' >
                <div 
                    onClick={(e)=>{
                        handleClick(e)
                    }} 
                className={`Libelle_form_create ${open ? 'Libelle_form_create_open' : ''}`}>
                   <div>
                        <h4>Créer un libellé</h4>
                        <input value={titre} onChange={(e)=> {setTitre(e.target.value)}} type="text" placeholder='Créer un libellé' />
                        <FontAwesomeIcon onClick={()=>{
                            handleCreate()
                        }} icon={faSave}/>
                   </div>
                </div>
                <div className='Libelle_folder'>
                    <div className='Libelle_create'>
                        <FontAwesomeIcon onClick={(e)=>{
                            handleClick(e)
                        }} className="Libelle_icon" icon={faFolderPlus}/>
                    </div>
                    {currentUser && <Read/>}
                    
                </div>
            </div>}
        </div>
    );
};

export default LibellePage;