import React, {useState,useEffect} from 'react';
import {Avatar, Button, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SidebarChat from "./SidebarChat";
import './Sidebar.css'
import db, { auth } from './firebase';
import { useStateValue } from './StateProvider';
function Sidebar(){
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    const logOut = () => {
        auth.signOut();
        window.location.reload()
    }
    // const authListener = () =>{
    //     auth.onAuthStateChanged((user) => {
    //         if(user){
    //             user = user
    //         }
    //     })
    // }

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    },[]); 


    return(
        <div className="sidebar">
        <div className="sidebar__header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar__headerRight">
                    {/* <IconButton>
                        <DonutLargeIcon/>
                    </IconButton> */}
                    {/* <IconButton>
                        <ChatIcon/>
                    </IconButton> */}
                    <Button class="sidebar__logoutBtn" onClick={logOut}>
                        <MoreVertIcon/><span class="tooltiptext">Log out</span>
                    </Button>
                    
                </div>

        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search chat"/>
                </div>

        </div>
        <div className="sidebar__chats">
            <SidebarChat addNewChat />
            {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}

        </div>

        </div>
    )
}
export default Sidebar