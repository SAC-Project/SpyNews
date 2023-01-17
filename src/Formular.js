import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import "./Formular.css";
import { Link, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
function Formular() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(1)
  const [category, setCategory] = useState("general")
  const navigate = useNavigate();
  const [news, setnews] = useState(["Action", "Comedy", "Health", "Romance", "Sports", "Tragedy"]);

  console.log(sessionStorage.getItem("dataKey"))
  return (
    <div className="content">
      <div className="header">News Categories</div>
      <div className="formular">
        <Multiselect
          isObject={false}
          onRemove={(event) => {
            console.log(event);
            sessionStorage.setItem('dataKey', JSON.stringify(event));
          }}
          onSelect={(event) => {
            console.log(event);
            sessionStorage.setItem('dataKey', JSON.stringify(event));
          }}
          options={news}
          showCheckbox

        />

      </div>
      <button
        type="button"
        className="login__btn"
        onClick={() => navigate("/dashboard")}
      >
        Submit
      </button>
      <div>
        Back to <Link to="/">Register</Link>.
      </div>
    </div>
  );
}

export default Formular;
