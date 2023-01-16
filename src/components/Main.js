import React, { useState } from 'react'
import Login from './Login'

const Main = ({setIsLoggedIn}) => {

    const [log,setLog] = useState(false)

    if(log === true){
        return (
        <div className='main-div'>
 <h1 className="brand" onClick={(e) => setLog(false)}><i className='bx bxs-message-square-dots orange'></i> Converse</h1>
        <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
           
    )
}
else{
    return(
        <>
        <div className='main-div'>
         <h1 className="main-logo"><i className='bx bxs-message-square-dots orange'></i> Converse</h1>
         <p className='tagline'> The only CHAT app that you always wanted!</p>
         <button className='sendBtn' id='start' onClick={(e) => setLog(true)}>Get Started</button>
    </div>
     <div className='footer'>
     <p className='footer-text'>Developed with ❤️ by Abhishek</p>
 </div>
 </>
    )
}
    
  
}

export default Main