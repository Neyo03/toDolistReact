import React, { useState } from 'react';

const Burger = () => {
    //Je déclare un state visibleLinks 
    const [visibleLinks, setVisibleLinks] = useState(false)
    let className = "Burger " + visibleLinks ?? "visibleLinkClass"
    //Function qui mets a jour visibleLinks à l'inverse de sa valeur ( si il est a false alors il sera a true et si il est a true alors il sera a false)
    //C'est soi cacher sois afficher le menu burger
    function handleClick(){
        setVisibleLinks(!visibleLinks)
    }
    return (
        <div className={ className } onClick={handleClick}>
            burger
        </div>
    );
};

export default Burger;