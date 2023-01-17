import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import "./Formular.css";
import { Link, useNavigate } from "react-router-dom";

function Formular() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(1)
  const [category, setCategory] = useState("general")
  const navigate = useNavigate();
    return (
        <div className="content">
            <div className="header">News Categories</div>
            <div className="formular">
            <Menu active={active} setActive={setActive} setCategory={setCategory}/>
            </div>
            <button
          type="button"
          className="login__btn"
        >
          Submit <Link to="/"></Link>
        </button>
        <div>
        Back to <Link to="/register">Register</Link>.
      </div>
      </div>
    );
}

export default Formular;
