import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import "./Formular.css";
import { Link, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import newsGenres from "./newsGenres";

function Formular() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(1)
  const [category, setCategory] = useState("general")
  const navigate = useNavigate();
  const [news, setnews] = useState(newsGenres.map((genre) => genre.value));

  const submitPreferences = () => {
    const currPreferences = JSON.parse(localStorage.getItem('userPreferences'));
    const fraction = (1 / currPreferences.length).toFixed(2);
    const newPreferences = [];
    currPreferences.forEach((pref) => {
      newPreferences.push({ name: pref, value: fraction });
    });

    newsGenres.forEach(genre => {
      if (!currPreferences.includes(genre.value)) {
        newPreferences.push({ name: genre.value, value: 0 });
      };
    })

    localStorage.removeItem('userPreferences');
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));

    navigate("/dashboard");
  }

  return (
    <div className="content">
      <div className="header">News Categories</div>
      <div className="formular">
        <Multiselect
          isObject={false}
          onRemove={(event) => {
            console.log(event);
            localStorage.setItem('userPreferences', JSON.stringify(event));
          }}
          onSelect={(event) => {
            console.log(event);
            localStorage.setItem('userPreferences', JSON.stringify(event));
          }}
          options={news}
          showCheckbox

        />

      </div>
      <button
        type="button"
        className="login__btn"
        onClick={() => submitPreferences()}
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
