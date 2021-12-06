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
            <div>
                <Link to={"updateNote/"+note.id} state={note}>
                    <h3>{note.titre}</h3>
                    <p>{note.text}</p>   
                </Link>
            </div> 
        )
    );
};

export default Display;