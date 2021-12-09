import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faArchive, faPaperPlane, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UIdContext } from '../context/UIdContext';
import MenuEllipsV from './MenuEllipsV';

const Display = ({note, number}) => {

    const [openMenu, setOpenMenu] = useState(false)
    const [openMenuColors, setOpenMenuColors] = useState(false)
   
    const uid = useContext(UIdContext)

    function handleOver(index) {
        document.getElementsByClassName('Note_icons')[index].classList.toggle('Note_icons_hover')
    }
    
    function nl2br (str, is_xhtml) {   
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    }
    
    document.getElementsByClassName('Read')[0].addEventListener("mouseover",(e)=>{
        
        if (e.target.classList.contains("Note") && openMenu===true ) {
            setOpenMenu(false)
        }
        if (e.target.classList.contains("Note") && openMenuColors===true) {
            setOpenMenuColors(false)
        }
    })
    const idCheck = ()=>{
        if (note.uid === uid) {
            return true
        }
        else{
            return false
        }
    }
    idCheck();
    console.log(note.color);
    return (
        idCheck() && (
             <div className="Note" style={ note.color  && { backgroundColor : note.color, transition: ".3s linear", border: "none"}} onMouseOver={()=>handleOver(number)} onMouseOut={()=>handleOver(number)} >
                <Link to={"updateNote/"+note.id}>
                    <h3>{note.titre}</h3>
                    <p>{nl2br(note.text.substr(0, 600))}</p>   
                </Link>
                <div className="Note_icons">
                    <FontAwesomeIcon className="Note_icon" icon={faArchive} />
                    <FontAwesomeIcon 
                        className="Note_icon" 
                        onMouseOver={()=>
                            {
                                setOpenMenuColors(true) 
                                setOpenMenu(false)
                            }
                        } 
                        icon={faPalette} />
                    <MenuEllipsV type={'colors'} className={openMenuColors && 'MenuColors_open'}  note={note}/>
                    <FontAwesomeIcon 
                    className="Note_icon" 
                    onMouseOver={()=>
                        {
                            setOpenMenu(true)
                            setOpenMenuColors(false)

                        }
                    } 
                    icon={faEllipsisV} />
                    <MenuEllipsV type={'menuEllips'} className={openMenu && 'MenuEllipsV_open'} note={note}/>
                </div>
            </div> 
        )
    );
};

export default Display;