import './App.css';
import Login from './components/Login';
import { useRef, useState } from 'react';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Cookies from 'universal-cookie';
import Main from './components/Main';
const cookie = new Cookies()

function App() {
  const [confirm, setConfirm] = useState("")
  const token = cookie.get("refresh-token");
  const [isLoggedIn, setIsLoggedIn] = useState(token)
  const [room, setRoom] = useState(null)
  const [verify, setVerify] = useState(false);

  const roomRef = useRef(null)
 
  const logoutHandler = async () => {
     await signOut(auth)
     cookie.remove("refresh-token")
     setIsLoggedIn(false)
     setRoom(null)
  }

  const linkGenerator = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    let link = "";

    for(let i = 0; i < length; i++){
      let salt = Math.floor(Math.random() * characters.length)
      link = link + characters[salt];
    }
     setRoom(link)
    console.log(link);
   }

  const copyText = () => {
     navigator.clipboard.writeText(roomRef.current.value)
     alert("Link Copied!")
  }

  const roomEntry = () => {
    if(roomRef.current.value !== ""){
    setRoom(roomRef.current.value.toUpperCase().trim())
    setConfirm(true)
    }
    else{
      alert("Please Enter Room Name to Continue!")
    }
  }

  if (!isLoggedIn) {
    return (
      <>
      <Main setIsLoggedIn={setIsLoggedIn} />
      </>
    )
  }

  return (
    <>
    <div>
      <h1 className="brand"><i className='bx bxs-message-square-dots orange'></i> Converse</h1>
      {
        room && confirm ? <Chat room={room}  />  :
        <div className='big-div'>
          <div className='main-chat-div'>
            <h1>Create/Enter Room Link to Start Chatting</h1>
            <div className='flexi'>
            <input className='input' id='roomInput' ref={roomRef} value={room} placeholder="Enter Room Link here..."></input>
            <button className='sendBtn' id='copy' onClick={() => linkGenerator(16)}><i class='bx bx-link-alt' style={{"color":"#ff6e13"}} ></i> Generate Link</button>
              </div>
            {/* <button className='sendBtn' id='roomBtn' onClick={roomEntry}>Enter Room</button>*/}
            <div className='flexi'>
           { room !== null ? <button className='sendBtn' id='copy' onClick={copyText}> <i class='bx bxs-copy' style={{"color":"#ff6e13"}}  ></i> Copy Link</button> : <div></div>} 
             </div>
           <button className='sendBtn' id='roomBtn' onClick={roomEntry}><i class='bx bxs-arrow-to-right'></i> Enter Room</button>

          </div>
          </div>
      }
    </div>
    <div className='signout-div'>
       <button className='signout' onClick={logoutHandler}>Signout</button>
    </div>
    </>
  );

}

export default App;
