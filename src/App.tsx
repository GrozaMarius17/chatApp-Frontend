import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Message } from './model/Message';
import AddMessageForm from './components/AddMessageForm';
import { Box } from '@mui/material';

function App() {

  const[messages, setMessages] =  useState<Message[]>([]);
  const [addMessage, setAddMessage] = useState<Message | null>(null);

  const getMessages = () => {
    axios.get('http://localhost:8080/chatApp/newMessages' ).then((response) => setMessages(response.data));
  }

  const closeEditMessageForm = (reload: boolean) => {
    if (reload) {
      getMessages();
    }
    setAddMessage(null);
  }

  useEffect(() => { axios.get('http://localhost:8080/chatApp/newMessages').then((response) => setMessages(response.data)) }, []);
  return (
   <div>  
      <Box className="App" sx={{ height: 1, justifyContent: 'center', width: 1, backgroundColor:'lightgray', display: 'flex', flexDirection:'column' }}>
        {messages.map(message => <div>{message.text}</div>)}
        {<AddMessageForm closeForm={closeEditMessageForm}></AddMessageForm>}
      </Box >
   </div> 
  

  )
}

export default App;
