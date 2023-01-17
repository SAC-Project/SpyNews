import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import loginImg from "../src/login.svg";

function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const login = () => {
    if (!email) alert("Please enter your email!");
    if (!password) alert("Please enter your ");
    else {
      logInWithEmailAndPassword(email, password);
      navigate("/dashboard");
    }
    
  }

  useEffect(() => {
    if (loading) {
      return;
    }
    //if (user) navigate("/dashboard");
    // return () => {
    //   user = false;
    // }
  }, [user, loading]);
  return (
    <div className="content">
      <div className="header">Login</div>
      <div className="image">
        <img src={loginImg} />
      </div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
        </div>
      </div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className="login__btn"
          onClick={login}
        >
          Login
        </button>
        <div className="forgotPass">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="link">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
