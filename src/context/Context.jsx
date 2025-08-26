import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyChats, dummyUserData } from '../assets/assets';

const AppContext = createContext();

export const AppContextProvider = ({ children }) =>{
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChat] = useState([])
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


    const fetchUser = async() => {
        setUser(dummyUserData)
    }

    const fetchChat = async() =>{
        setChat(dummyChats),
        setSelectedChat(dummyChats[0])

    }

    useEffect(()=>{
        fetchUser();
    }, [])
    useEffect(()=>{
        if(user){
            fetchChat();
        }
        else{
            setChat([])
            setSelectedChat(null)
        }
    }, [user])

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme)
    }, [theme])
    const value = {
        navigate,
        user,
        setUser,
        fetchUser,//why passing it idk
        chats, setChat,
        selectedChat, setSelectedChat,
        theme, setTheme

    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = ()=> useContext(AppContext)
