import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UIdContext } from '../context/UIdContext';

const Display = ({note}) => {

    const uid = useContext(UIdContext)
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
            <div className="Note">
                <Link to={"updateNote/"+note.id}>
                    <h3>{note.titre}</h3>
                    <p>{note.text.substr(0, 600)}</p>   
                </Link>
                <div>
                    <button>ARCHIVE</button>
                    <button><i className="fas fa-palette"></i></button>
                    <button>...</button>
                </div>
            </div> 
        )
    );
};

export default Display;