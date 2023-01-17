import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
import loginImg from "../src/login.svg";
import GoogleButton from 'react-google-button';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!username) alert("Please enter your username!");
    if (!email) alert("Please enter your email!");
    if (!password) alert("Please enter your ");
    else {
      registerWithEmailAndPassword(username, email, password);
      navigate("/formular");
    }
    
  };

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) navigate("/formular");
  // }, [user, loading]);

  return (
    <div className="content">
      <div className="header">Register</div>
      <div className="image">
        <img src={loginImg} />
      </div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="register__textBox"
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail Address</label>
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="footer">
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div className="or">
        <hr></hr>OR<hr></hr>
        </div>
        
        <GoogleButton className="googleBtn"
          onClick={signInWithGoogle}
        />
        <div className="link">
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
