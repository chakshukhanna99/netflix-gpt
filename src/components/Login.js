import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import {useDispatch} from 'react-redux'
import {addUser} from '../utils/userSlice'
import {USER_AVATAR,BG_URL } from "../utils/constant"

const Login = ()=>{
    const dispatch = useDispatch();
    const [isSignInForm,setiisSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const toggleSignInForm=()=>{
        setiisSignInForm(!isSignInForm);
    }
    const handleButtonClick=()=>{
        //validate the form 
        // checkValidData();
        // console.log(email);
        // console.log(password);
      const message =  checkValidData(email.current.value,password.current.value);
      setErrorMessage(message);

      if(message) return;
//sign in logic
      if(!isSignInForm){
        createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
        displayName: email.current.value, photoURL: USER_AVATAR
      }).then(() => {
        // Profile updated!
        // ...
        const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({usd:uid,displayName:displayName,email:email,photoURL:photoURL}));
      }).catch((error) => {
        // An error occurred
        // ...
        setErrorMessage(error.message);
      });
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-"+errorMessage);
    // ..
  });


      }else{
        //signin logic

        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });

      }
    }
    return(
        <div>
        <Header/>
        <div className="absolute">
        <img className="h-screen w-screen object-cover" src={BG_URL}
        alt='background'/>
        </div>
        <form
        onSubmit={(e)=>e.preventDefault()}
         className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input className="py-4 my-2  w-full p-1 bg-gray-700" type="text" placeholder="Full Name" />}
            <input ref={email} className="py-4 my-2 w-full p-1 bg-gray-700" type="text" placeholder="Email Address" />
            <input ref={password} className="py-4 my-2  w-full p-1 bg-gray-700" type="password" placeholder="Password" />
            <p className="text-red-600 py-2 font-bold text-">{errorMessage}</p>
            <button onClick={handleButtonClick} className="py-4 my-6 bg-red-600 w-full rounded-lg ">{isSignInForm? "Sign In" : "Sign Up"}</button>
            <p className="p-2" onClick={toggleSignInForm}>{isSignInForm? "New To NetFlix? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>
        </div>
    )
}
export default Login;