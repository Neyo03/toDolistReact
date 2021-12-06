import React from 'react';
import { AuthProvider } from './context/AuthContext';
import InscriptionPage from './pages/InscriptionPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';
import Create from './components/Create';
import UpdatePage from './pages/UpdatePage';

const App = () => {
  
  return (
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="inscription" element={<InscriptionPage  /> }/>
          <Route path="connexion" element={<LoginPage  /> }/>
          <Route exact path="/" element={<Main  /> }/>
          <Route  path="newNote" element={<Create/>}/>
          <Route  path="/updateNote/:id" element={<UpdatePage />}/>
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    
  );
};

export default App;