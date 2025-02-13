
/*import React, { createContext, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { CaptainDataContext } from '../context/CaptainContext'
import { UserDataContext } from '../context/UserContext'

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL




const SocketProvider = ({ children }) => {

    const { captain } = useContext(CaptainDataContext);
    const { user } = useContext(UserDataContext);
   

    useEffect(() => {

        //if(!captain || !user) return
        
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });


     

    }, []);


    /*const sendMessage = (eventName, message) =>{
        socket.emit(eventName, message);
    }


    const receiveMeassage = (eventName, callback) =>{
        socket.io(eventName, callback);
    } 



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider; */



import React, { createContext, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { CaptainDataContext } from '../context/CaptainContext';
import { UserDataContext } from '../context/UserContext';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    // Ensure Captain and User contexts exist before destructuring
    const captainContext = useContext(CaptainDataContext);
    const userContext = useContext(UserDataContext);

    

    const { captain } = captainContext;
    const { user } = userContext;

    useEffect(() => {
        if (!captain && !user) return; // Only connect if either captain or user exists

        socket.connect();


        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        /*return () => {
            socket.disconnect(); // Cleanup on unmount
        }; */

    }, [captain, user]); // Re-run effect when captain or user changes

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
