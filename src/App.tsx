import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Message } from './model/Message';

function App() {

  const [chatApp, setChatApp] =  useState<any>({});
  const[messages, setMessages] =  useState<Message[]>([]);


  const getMessages = () => {
    axios.get('http://localhost:8080/chatApp?').then((response) => setMessages(response.data));
  }
  useEffect(() => { axios.get('http://localhost:8080/chatApp/messages').then((response) => setMessages(response.data)) }, []);
  useEffect(() => {axios.get('http://localhost:8080/chatApp').then((response) => setChatApp(response.data)) }, []);
  return (
   <div>  
      {messages.map(message => <div>{message.text}</div>)}
   </div> 

  )
}

export default App;
