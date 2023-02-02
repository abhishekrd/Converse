import React from 'react'

const auth = () => {

  
  
  const [ pass, setPass ] = useState("");
  return (
    <div className='big-div'>
    <div className='main-chat-div'>
        <h1>Enter Room Name to Start Chatting</h1>
            <input className='input' value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Passcode..."></input>
            {/* <button className='sendBtn' id='roomBtn' onClick={roomEntry}>Enter Room</button> */}
            <button className='sendBtn' id='roomBtn' onClick={linkGenerator}>Generate Link</button>

    </div>
    </div>
  )
}

export default auth