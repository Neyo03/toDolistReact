import { faArchive, faEllipsisV, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import MenuEllipsV from './Menu';

const SelectedNotesComponent = () => {
    
    let listSelectedNotes=[]

    const [selectedNotes, setSelectedNotes] = useState([]);
  
    useEffect(()=>{
      
      let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
      let hightLightDiv= document.createElement('div');
      let pressing = false;
      let wheel = false 
      
      
      function reCalc() {
        var x3 = Math.min(x1,x2); //Smaller X
        var x4 = Math.max(x1,x2); //Larger X
        var y3 = Math.min(y1,y2); //Smaller Y
        var y4 = Math.max(y1,y2); //Larger Y
        hightLightDiv.style.left = x3 + 'px';
        hightLightDiv.style.top = y3 + 'px';
        hightLightDiv.style.width = x4 - x3 + 'px';
        hightLightDiv.style.height = y4 - y3 + 'px';
      }
      document.addEventListener('wheel', e=>{
          console.log(e);
        if (e.wheelDeltaY === 150) {
            wheel = false
        }
        else {
            wheel = true
            y2 += 100; //Update the current position Y
            reCalc();
        }
        
         
     });
      document.addEventListener('mousedown', e=>{ 
        pressing =true;
        setSelectedNotes(listSelectedNotes)
        for (let s = 0; s < listSelectedNotes.length; s++) {
            let element = listSelectedNotes[s]
            element.classList.remove('Note_selected') 
        }
        listSelectedNotes = []
        
  
        x1 = e.clientX; 
        y1 = e.clientY; 
        reCalc();
  
        hightLightDiv.classList.add('hightLightSelection')
        document.body.append(hightLightDiv)
        
       
        document.addEventListener('mousemove', e=>{  
           if(!wheel){   //If the user isn't scrolling
               
                y2 = e.clientY; //Update the current position Y
                
            }
            x2 = e.clientX; //Update the current position X
            reCalc();

            if (e.target.classList[0] ==='Note' && pressing ) { 
              e.target.classList.add('Note_selected') 
              if (!listSelectedNotes.includes(e.target)) {
                listSelectedNotes.push(e.target)
              }
            }
            e.stopPropagation()
        })
        document.addEventListener('mouseup', e=>{
            pressing = false
            setSelectedNotes(listSelectedNotes)
            hightLightDiv.remove() 
            e.stopPropagation()
        })
      })
     
    },[])
  
    useEffect(()=>{
        let menuSelectedNotes = document.querySelector('.App_menuSelectedNotes')
        if (selectedNotes.length>0) {
          menuSelectedNotes.classList.add('App_menuSelectedNotes_open')
        }
        else{
          menuSelectedNotes.classList.remove('App_menuSelectedNotes_open')
        }
      },[selectedNotes])

    return (
        <div className='App_menuSelectedNotes'>
           <p>{selectedNotes.length>1 ? selectedNotes.length+' Notes séléctionnées' : selectedNotes.length+' Note séléctionnée'}</p>
           <div>
            
            <FontAwesomeIcon
                className="Note_icon" 
                icon={faArchive} 
            />
            <FontAwesomeIcon
                className="Note_icon" 
                icon={faPalette} 
            />
            <FontAwesomeIcon
                className="Note_icon" 
                icon={faEllipsisV} 
            />
           </div>
           

        </div>
    );
};

export default SelectedNotesComponent;