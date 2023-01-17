import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Menu from "./Menu";
import NewsGrid from "./NewsGrid";
import News from './news.json'
import { async } from "@firebase/util";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const [active, setActive] = useState(1)
  const [category, setCategory] = useState("general")
  const [error, setError] = useState(null)
  console.log(sessionStorage.getItem("dataKey"))



  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  });


  return (
    <div className="App">
      <button type='button' className='logout-btn' onClick={() => navigate("/")}>
        <span className='fs-18 fw-6'>Log Out</span>
      </button>
      <h1 className="title">See The Latest News</h1>
      {/* <Menu active={active} setActive={setActive} setCategory={setCategory}/> */}
      <NewsGrid items={News} />


    </div>
  );
}

export default Dashboard;