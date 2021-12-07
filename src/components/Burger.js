import React, { useState } from 'react';

const Burger = () => {
    //Je déclare un state visibleLinks 
    const [visibleLinks, setVisibleLinks] = useState(false)
    //Function qui mets a jour visibleLinks à l'inverse de sa valeur ( si il est a false alors il sera a true et si il est a true alors il sera a false)
    //C'est soi cacher sois afficher le menu burger
    function handleClick(){
        setVisibleLinks(!visibleLinks)
    }
    return (
        //Si le state visibleLinks est a true alors on mets la classe css pour afficher les liens
        <div className={ visibleLinks && "visibleLinkClass" } onClick={handleClick}>
            burger
        </div>
    );
};

export default Burger;