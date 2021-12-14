import React from 'react';
import { AuthProvider } from './context/AuthContext';
import InscriptionPage from './pages/InscriptionPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';
import Create from './components/Create';
import UpdatePage from './pages/UpdatePage';
import { MessageProvider } from './context/MessageContext';
import ArchivagePage from './pages/ArchivagePage';
import Header from './components/Header';
import CorbeillePage from './pages/CorbeillePage';
import { ReloadReadProvider } from './context/ReloadReadAfterActions';
import { useState } from 'react/cjs/react.development';


const App = () => {

  const [selectedNotes, setSelectedNotes] = useState([])

  const hightLightDiv = document.createElement('div')
  let pressing = false;
  let listSelectedNotes=[]

    document.addEventListener('mousedown', e=>{
          
      pressing =true;
      let height =0;
      let width = 0;
    
      hightLightDiv.style.backgroundColor='rgba(100,100,100,.08)'
      hightLightDiv.style.position = 'absolute'
      hightLightDiv.style.height = height + 'px'
      hightLightDiv.style.width = width + 'px'
      hightLightDiv.style.top = e.y + 'px'
      hightLightDiv.style.left = e.x + 'px'
      hightLightDiv.style.pointerEvents ='none'
      
      hightLightDiv.id='hightLightDiv'
      
      document.body.append(hightLightDiv)


      document.addEventListener('mousemove', e=>{  
          
        hightLightDiv.style.height = height + 'px'
        hightLightDiv.style.width = width + 'px'
          height = e.clientY
          width = e.clientX
          
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
          
          setTimeout(() => {
              setSelectedNotes(listSelectedNotes)
          }, 0);
          hightLightDiv.remove()  
          e.stopPropagation()
      })
      e.stopPropagation()
  })
 
  return (
      <AuthProvider>
        <MessageProvider>
          <ReloadReadProvider>
            <BrowserRouter>
            <Header />
            <Routes>
              <Route path="inscription" element={<InscriptionPage  /> }/>
              <Route path="connexion" element={<LoginPage  /> }/>
              <Route exact path="/" element={<Main  /> }/>
              <Route  path="newNote" element={<Create/>}/>
              <Route  path="/updateNote/:id" element={<UpdatePage />}/>
              <Route  path="archive" element={<ArchivagePage />}/>
              <Route  path="corbeille" element={<CorbeillePage />}/>

            </Routes>
            </BrowserRouter>
          </ReloadReadProvider>
        </MessageProvider>
      </AuthProvider>
    
  );
};

export default App;