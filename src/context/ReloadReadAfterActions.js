import { createContext } from "react";
import { useState } from "react/cjs/react.development";

//Cela va me servir a recharger le Read.js après une action pour contrer une bug de disparition de toutes les notes

export const ReloadReadContext = createContext(null)

export const ReloadReadProvider = ({children}) => {
    const[reload, setReload] = useState(false)
    return(
        <ReloadReadContext.Provider value={{reload, setReload}}>
            {children}
        </ReloadReadContext.Provider>
    
       )
};