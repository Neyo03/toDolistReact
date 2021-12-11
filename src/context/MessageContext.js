import React, { createContext } from 'react';
import { useState } from 'react/cjs/react.development';


export const MessageContext = createContext();

export const MessageProvider = ({children}) => {
    const[message, setMessage] = useState(null)
    const[typeMessage, setTypeMessage] = useState(null)
    return(
        <MessageContext.Provider value={{message, setMessage, typeMessage, setTypeMessage}}>
            {children}
        </MessageContext.Provider>
    
       )
};

export default MessageContext;