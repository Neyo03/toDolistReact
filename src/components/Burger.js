import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArchive, faTrash, faClone } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Burger = () => {
   
    return (
        <div className={`Burger ` }>
            
            
            <Link to="/"><FontAwesomeIcon className="Buger_menu_icon" icon={faHome}/><span>Notes</span></Link>
            <Link to="/libelle"><FontAwesomeIcon className="Buger_menu_icon" icon={faClone}/><span>Gérer les libellés</span></Link>
            <Link to="/archive"><FontAwesomeIcon className="Buger_menu_icon" icon={faArchive}/><span>Archives</span></Link>
            <Link to="/corbeille"><FontAwesomeIcon className="Buger_menu_icon" icon={faTrash}/><span>Corbeille</span></Link>
                
            
            
        </div>
    );
};

export default Burger;