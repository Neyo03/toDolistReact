import React, { useContext, useEffect } from 'react';
import { faCheckCircle, faTimesCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react/cjs/react.development';
import MessageContext from '../context/MessageContext';

const Message = ({message, type}) => {
    const [opacity, setOpacity] = useState(0);
    const messageSession = useContext(MessageContext)
    useEffect(()=>{
        if (message) {
            setOpacity(1)
            setTimeout(() => {
                setOpacity(0) 
            }, 2500);
            setTimeout(() => {
                messageSession.setMessage(null)
                messageSession.setTypeMessage(null)
            }, 3000);
        }
    }, [message])
    return (
        type === 'error' ?
            <div style={message && { opacity : opacity  }} className='Message_ERROR'>
                {message} <FontAwesomeIcon className="Message_ERROR_icon" icon={faTimesCircle} />
            </div>
        : type === 'sucess' ? 
            <div style={message && { opacity : opacity  }} className='Message_SUCESS'>
                {message} <FontAwesomeIcon className="Message_SUCESS_icon" icon={faCheckCircle} />
            </div> 
        : type === "autre" ?
            <div style={message && { opacity :  opacity }} className='Message_AUTRE'>
                {message} <FontAwesomeIcon className="Message_AUTRE_icon"  icon={faExclamationCircle} />
            </div>
        :
        '' 
    );
};

export default Message;