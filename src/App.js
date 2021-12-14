import React, { useContext, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import InscriptionPage from './pages/InscriptionPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';
import Create from './components/Create';
import UpdatePage from './pages/UpdatePage';
import MessageContext, { MessageProvider } from './context/MessageContext';
import ArchivagePage from './pages/ArchivagePage';
import Header from './components/Header';
import CorbeillePage from './pages/CorbeillePage';
import { ReloadReadProvider } from './context/ReloadReadAfterActions';


const App = () => {
 
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