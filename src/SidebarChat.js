import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material';
import db from './firebase'
import { Link } from 'react-router-dom';


function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("")
  const [messages, setMessages] = useState("")

  useEffect(() =>{
    db.collection("rooms").doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()))
    })
  }, [id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter name for the chat");

    if(roomName){
        db.collection('rooms').add({
          name: roomName,
        })
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="flex">
          <div className='p-5 flex'>
          <Avatar alt="Remy Sharp" src={`/static/images/avatar/${seed}.jpg `}/>
          </div>
          <div className="flex-1">
          <div className="pl-0.25 pt-5 pb-5">
              <h2 className="font-bold">{name}</h2>
              <p>{messages[0]?.message}</p>
          </div>
          </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='pl-5 pt-3 pb-3 hover:bg-red-400'>
      <h2 className='font-bold text-center'>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat
