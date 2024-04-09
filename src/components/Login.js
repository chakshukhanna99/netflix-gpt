import { useState,useRef } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import {useDispatch} from 'react-redux'
import {addUser} from '../utils/userSlice'

const Login = ()=>{
    const navigate = useNavigate();
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
        displayName: email.current.value, photoURL: "https://avatars.githubusercontent.com/u/103903052?v=4"
      }).then(() => {
        // Profile updated!
        // ...
        const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({usd:uid,displayName:displayName,email:email,photoURL:photoURL}));
        navigate("/browse")
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
    console.log(user);
    navigate("/browse");
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
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/6cefb2f5-90be-4f57-adc4-f6c3c579273d/3943990c-f4e0-4147-82ad-f531e2b547f3/IN-en-20240401-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt='background'/>
        </div>
        <form
        onSubmit={(e)=>e.preventDefault()}
         className="rounded-lg w-3/12 absolute bg-black p-10 mt-36 mx-auto right-0 left-0 text-white bg-opacity-80">
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