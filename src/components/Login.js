import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
const cookies = new Cookies()


const Login = ( {setIsLoggedIn} ) => {

    const LoginWithGoogle = async () => {
    try{
        const userData = await signInWithPopup(auth, provider);
        cookies.set("refresh-token",userData.user.refreshToken)
        setIsLoggedIn(true)
        console.log(userData.user);

    }
    catch(err){
        console.log(err);
    }

      
    }

  return (
    <div className='welcome-div'>
       <hr></hr>
        <p>SignIn with Google to Continue</p>
        <button className='googleLogin' onClick={LoginWithGoogle}><img src="./google.svg" alt='Google'></img>Signin with Google</button>
    </div>
  )
}

export default Login