import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import InscriptionPage from './pages/InscriptionPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';
import UpdatePage from './pages/UpdatePage';
import { MessageProvider } from './context/MessageContext';
import ArchivagePage from './pages/ArchivagePage';
import Header from './components/Header';
import CorbeillePage from './pages/CorbeillePage';
import { ReloadReadProvider } from './context/ReloadReadAfterActions';
import LibellePage from './pages/LibellePage';


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
              <Route  path="/updateNote/:id" element={<UpdatePage />}/>
              <Route  path="archive" element={<ArchivagePage />}/>
              <Route  path="corbeille" element={<CorbeillePage />}/>
              <Route  path="libelle" element={<LibellePage />}/>
            </Routes>
            </BrowserRouter>
          </ReloadReadProvider>
        </MessageProvider>
      </AuthProvider>
    
  );
};

export default App;