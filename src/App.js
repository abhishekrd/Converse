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

  const token = cookie.get("refresh-token");
  const [isLoggedIn, setIsLoggedIn] = useState(token)
  const [room, setRoom] = useState(null)
  const roomRef = useRef(null)
 
  const logoutHandler = async () => {
     await signOut(auth)
     cookie.remove("refresh-token")
     setIsLoggedIn(false)
     setRoom(null)
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
        room ? <Chat room={room}  />  :
        <div className='big-div'>
          <div className='main-chat-div'>
            <h1>Enter Room Name to Start Chatting</h1>
            <input className='input' id='roomInput' ref={roomRef} placeholder="Enter Room name here..."></input>
            <button className='sendBtn' id='roomBtn' onClick={() => setRoom(roomRef.current.value)}>Enter Room</button>
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
