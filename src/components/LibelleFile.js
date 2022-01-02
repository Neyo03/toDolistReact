import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LibelleFile = ({number,libelle}) => {
    return (
        <div className='Libelle_file'>
             <FontAwesomeIcon className="Libelle_icon" icon={faFolder}/>
             {libelle.titre}
        </div>
    );
};

export default LibelleFile;