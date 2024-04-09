import React from 'react'
import {  signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'


const Header = () => {
  const user = useSelector(store=>store.user)
  const navigate = useNavigate();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  return (
    <>
    
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img
        className='w-44'
         src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt='logo'/>

   {user&&<div className='flex p-2'>
   <img
  className='w-14'
  src={user.photoURL}
  alt='user'
/>

      {/* <button onClick={handleSignOut} className='text-white font-bold w-28'>{user.displayName +"\n SignOut"} </button> */}
             <button onClick={handleSignOut} className='text-white font-bold w-28'>{"SignOut"} </button>
      </div>}
      </div>
   
    </>

  )
}

export default Header