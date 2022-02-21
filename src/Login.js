import React, { useState } from 'react'
import './Login.css'
import {Link, useHistory}  from "react-router-dom";
import { auth } from './firebase';

function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const signIn= e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email,password).then(auth => {
                history.push('/')
            })
            .catch(error=> alert(error.message))

        //some fancy firebase login shitt...
    }
    const register = e =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email,password).then((auth)=> {
            // it successfully created a new user with email and password
            console.log(auth);
            if(auth){
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
        //do some fancy firebase register shit..
    }
    return (
        <div className="login">
            <Link to ='/'>
                <img src="https://drive.google.com/uc?id=1F1w9_2ZC0Y7_iTatfelDqQITN0ev_0FX" className="login_logo" alt=""/>
            </Link>

            <div className="login_container">
                <h1>Sign-in</h1>

                <form>
                    <h5>E-Mail</h5>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=> setPassword(e.target.value)} />

                    <button type="submit"  className="login_signInButton" onClick={signIn}>Sign In</button>
                </form>

                <p>
                    By Signing-in you agree to Sports Station Condition of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
                </p>

                <button onClick={register} className="login_registerButton">Create Your Account</button>
            </div>
        </div>
    )   
}

export default Login
