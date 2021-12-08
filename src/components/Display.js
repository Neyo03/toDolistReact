import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faArchive, faPaperPlane, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UIdContext } from '../context/UIdContext';

const Display = ({note, number}) => {

    const uid = useContext(UIdContext)
    function handleOver(index) {
        document.getElementsByClassName('Note_icons')[index].classList.toggle('Note_icons_hover')
    }
    
    
    const idCheck = ()=>{
        if (note.uid === uid) {
            return true
        }
        else{
            return false
        }
    }
    idCheck();
    return (
        idCheck() && (
            <div className="Note" onMouseOver={()=>handleOver(number)} onMouseOut={()=>handleOver(number)} >
                <Link to={"updateNote/"+note.id}>
                    <h3>{note.titre}</h3>
                    <p>{note.text.substr(0, 600)}</p>   
                </Link>
                <div className="Note_icons">
                    <FontAwesomeIcon className="Note_icon" icon={faArchive} />
                    <FontAwesomeIcon className="Note_icon" icon={faPalette} />
                    <FontAwesomeIcon className="Note_icon" icon={faEllipsisV} />
                </div>
            </div> 
        )
    );
};

export default Display;