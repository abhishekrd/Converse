import React, { useEffect } from 'react'
import { useState } from 'react'
import { addDoc, collection, onSnapshot, query, where, serverTimestamp, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const Chat = ( {room} ) => {

  const [msg,setMsg] = useState("");
  const [chats, setChats] = useState([]);
  const collectionRef = collection(db,"messages")

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(msg);

    if(msg === ""){return}
    else{
    
    await addDoc(collectionRef,{
      text:msg,
      createdAt:serverTimestamp(),
      createdBy:auth.currentUser.displayName,
      room:room
    })
  }

    setMsg("")
  }

  useEffect(() => {
     const queryMsgs = query(collectionRef, where("room", "==", room), orderBy("createdAt"));
    const cleanUp = onSnapshot(queryMsgs, (snapshot) => {
      const chats = [];
      snapshot.forEach((doc) => {
         chats.push({...doc.data(), id:doc.id})
      })
      setChats(chats)
     })

     return () => cleanUp()
  },[]);

  return (
    <div className='big-div'>
    <div className='main-chat-div'>
        <p className='roomName'><i className='bx bx-message-square-dots chaticon'></i> {room}</p>
    <div className='onlychat'>
        {chats.map((chat) => 
          <div className='chat-div'>
               <p><strong>{chat.createdBy}: </strong></p>
               <p className='chattxt'>{chat.text}</p>
          </div>
        )}
    </div>
      <form onSubmit={submitHandler} className="form">
        <input placeholder='Type your message here...' className='input' value={msg} onChange={(e) => setMsg(e.target.value)}></input>
        <button type='submit' className='sendBtn'><i className='bx bx-send eff' ></i> Send</button>
      </form>
    </div>
    </div>
  )
}

export default Chat