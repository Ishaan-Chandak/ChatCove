import React, { useEffect, useState } from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import { useStateValue } from './StateProvider';

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
       const unsubscribe =  db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        })
        return () => {
            unsubscribe();
        };
    }, [])
  return (
    <div className="flex-[0.35]">
       <div>
        <div className="flex justify-between p-5 border-r-[1px]">
            <div>
                <Avatar src={user?.photoURL} />
                {console.log(user?.photoURL)}
            </div>
            <div className="flex justify-between min-w-[10vw ] mr-[2vw] text-2xl">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
            </div>
            <div className="mr-2 ml-2 mt-1 mb-1 rounded-md border-white">
                
                <form>   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search or start new chat' required />
                    </div>
                </form>

            </div>
            <div>
                <SidebarChat addNewChat={true}/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar;