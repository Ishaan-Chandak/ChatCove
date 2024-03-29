import React, { useEffect, useState } from 'react'
import { Avatar, Icon, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from './firebase'
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const {roomId} = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if(roomId) {
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
            setRoomName(snapshot.data().name)
        })

        db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => {
           setMessages(snapshot.docs.map(doc => doc.data())) 
        })
    }
  },[roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  }, [])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>> ", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("");
  }

  return (
    <div className='flex flex-[0.65]'>
      <div className='chat'>
      <div className='chat_header'>
        <Avatar />

        <div className='chat_headerInfo'>
          <h3>{roomName}</h3>
          <p>Last seen{" "}
            {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>
          <div className='chat_headerRight'>
             <IconButton>
              <SearchIcon  />
             </IconButton>
             <IconButton>
              <AttachFileIcon/>
             </IconButton>
             <IconButton>
              <MoreVertIcon />
             </IconButton>
          </div>
        </div>
        <div className="chat_body">
            {messages.map((message) => (
             <p className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
            <span className='chat_name'>
             {message.name}
            </span>
              {message.message}
            <span className='chat_timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
            </p>
            ))}
        </div>
        <div className='flex'>
          <IconButton>
            <EmojiEmotionsIcon/>
          </IconButton>
          <form className='flex-1 m-1'>   
                <div class="relative">
                        <input value={input}
                        onChange={e => setInput(e.target.value)} type="search" id="default-search" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Write message' required />
                        <button onClick={sendMessage} type='submit'></button>
                </div>
            </form>
            <IconButton>
              <MicIcon/>
            </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Chat;
