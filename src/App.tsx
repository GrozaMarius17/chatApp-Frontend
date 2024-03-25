import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Conversation } from './model/Conversation';
import { User } from './model/User';
import AddConversationForm from './components/AddConversationForm';
import UserSelect from './components/UserSelect';
import { Badge, Box, Button, Card, FormControl, InputLabel, MenuItem, Rating, Select, Slider, TextField } from '@mui/material';
import { DEFAULT_ECDH_CURVE } from 'tls';
import { Chat } from './model/Chat';
import { Message } from './model/Message';

function App() {

  const[allUsers, setAllUsers] =  useState<any>([]);
  const[chats, setChats] =  useState<Chat[]>([]);
  const[userName, setUserName] =  useState<string>("");
  const[messages, setMessages] = useState<Message[]>([])
  const[addMessage, setAddMessage] = useState<string>("")
  const[selectedChat, setSelectedChat] = useState<number|undefined>(undefined)
  const[addUserName, setAddUserName] = useState<string>("")
  const[userToName, setUserToName] = useState<string>("")

  const selectUser = (name:string) => {
    setAddMessage("")
    setMessages([])
    setChats([])
    setSelectedChat(undefined)
    setUserName(name)
    const userId = allUsers.find((u:any) => u.name === name).id
    userId && axios.get('http://localhost:8080/users/' + userId + '/chats').then((response) => setChats(response.data))
  }

  const sendMessage = () => {
    axios.post('http://localhost:8080/chats/' + selectedChat + '/messages', {text: addMessage, sender:{name:userName}}).then((response) => setMessages(response.data));
    setAddMessage("")
  }


  const selectChat = (id:number) => {
    axios.get('http://localhost:8080/chats/' + id + '/messages').then((response) => setMessages(response.data));
    setSelectedChat(id)
  }

  const addUser = () => {
    addUserName !== "" && axios.post('http://localhost:8080/users', {"name":addUserName}).then(() => getUsers())
    setAddUserName("")
  }

  const addChat = () => {
    userToName !=="" && userName !== "" && axios.post('http://localhost:8080/chats',
    {
      "userFrom":userName,
      "userTo":userToName
    }).then(() => selectUser(userName))
  }
  
  const getUsers = () => {
    axios.get('http://localhost:8080/users').then((response) => setAllUsers(response.data))
    allUsers && allUsers.length !== 0 && setUserName(allUsers[0]) 
  }

  useEffect(() => { getUsers()  }, []);
  
  return (
   <div>  
      <Box className="App" sx={{ height: 1, justifyContent: 'center', width: 1, backgroundColor:'lightgray', display: 'flex', flexDirection:'column' }}>
      <Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
      <Card sx={{ width: 0.8 }}>
        <TextField value={addUserName} label="User Name" onChange={(e) => setAddUserName(e.target.value)} ></TextField>
        <Button onClick={addUser} >Add User</Button>
      <FormControl fullWidth>
            <Select
                value={userName}
                label="user"
                onChange={(e) => selectUser(e.target.value)}
                >
                    {allUsers.map((user:any) => <MenuItem value={user.name}>{user.name}</MenuItem>)}
            </Select>
        </FormControl>
        {userName !== "" && <Card sx={{ width: 0.8 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="new-chat-label">New Chat</InputLabel>
            <Select
                labelId="new-chat-label"
                value={userToName}
                label="New Chat"
                onChange={(e) => setUserToName(e.target.value)}
                >
                    {allUsers.map((user:any) => <MenuItem value={user.name}>{user.name}</MenuItem>)}
            </Select>
        </FormControl>
        <Button size="large" variant="outlined" onClick={addChat}>Add Chat</Button>
        </Card>}
        {chats && chats.length !== 0 && chats.map((chat) => <Button onClick={() => selectChat(chat.id)}>{chat.id}</Button>)}
        {messages && messages.length !== 0 && messages.map((message) => <Card> {message.sender.name}:{message.text}</Card>)}
        {selectedChat && <TextField value={addMessage} label='Message' onChange={(e) => setAddMessage(e.target.value)}></TextField>}
        {selectedChat && addMessage && <Button onClick={() => sendMessage()}>Send</Button>}
        </Card>
        </Box>
         </Box >
   </div> 
  )
}

export default App;
