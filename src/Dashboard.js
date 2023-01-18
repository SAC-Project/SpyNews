import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import NewsGrid from "./NewsGrid";
import News from './news.json'

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  
  const [newsItems, setNewsItems] = useState([]);
  const [userPreferences, setUserPreferences] = useState([]);
  const [displayPreferences, setDisplayPreferences] = useState("");

  const RECOMMENDATIONS_COUNT = 12;

  const flattenNewsObject = (news) => {
    const flattenNews = news.map(item => {
      item.comedy = item.genres.comedy;
      item.action = item.genres.action;
      item.health = item.genres.health;
      item.sports = item.genres.sports;
      item.tragedy = item.genres.tragedy;
      item.romance = item.genres.romance;
      return item;
    });

    return flattenNews;
  }

  function dynamicSortMultiple() {
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
  }

  const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  const sortByGenre = (list, genre1, genre2) => {
    return list.sort(dynamicSortMultiple(genre1, genre2));
  }

  const recommendNews = (numberOfRecomm) => {
    if (userPreferences.length < 1) {
      return;
    }

    const newRecommendationList = [];
    const orderedPreferences = userPreferences.sort(dynamicSort("-value"));
    const firstPreference = orderedPreferences[0];
    const secondPreference = orderedPreferences[1];

    //const sortedNews = sortByGenre(News, "-" + firstPreference.name, "-" + secondPreference.name);
    //const sortedNews = News.sort(dynamicSortMultiple('-action, -comedy'));
    const sortedNews = News.sort(function(a, b) {
      var first = a[firstPreference.name] + a[secondPreference.name];
      var second = b[firstPreference.name] + b[secondPreference.name];
      return second - first;
    });

    console.log(orderedPreferences);
    
    setNewsItems(sortedNews.slice(0, numberOfRecomm));
  }

  useEffect(() => {
    let displayMessage = "";
    userPreferences.forEach(item => {
      displayMessage += item.name + ": " + item.value + " | ";
    });
    setDisplayPreferences(displayMessage);
  }, [userPreferences])

  useEffect(() => {
    console.log('User preferences were updated');
    recommendNews(RECOMMENDATIONS_COUNT);
  }, [userPreferences])

  useEffect(() => {
    const currPreferences = JSON.parse(localStorage.getItem('userPreferences'));
    currPreferences.forEach(item => item.value = Number(item.value));
    console.log('Updating user preferences...');
    setUserPreferences(currPreferences);
  }, []);

  useEffect(() => {
    const flattenNews = flattenNewsObject(News);
    const currNews = flattenNews.slice(0, RECOMMENDATIONS_COUNT);
    console.log(currNews);
    setNewsItems(currNews);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, []);

  const clickOnItem = (item) => {

    //window.open(item.url, '_blank');
    //window.focus();

    const updatedPreferences = [];
    const oldComedy = userPreferences.find(e => e.name === 'comedy')?.value;
    const oldAction = userPreferences.find(e => e.name === 'action')?.value;
    const oldHealth = userPreferences.find(e => e.name === 'health')?.value;
    const oldSports = userPreferences.find(e => e.name === 'sports')?.value;
    const oldTragedy = userPreferences.find(e => e.name === 'tragedy')?.value;
    const oldRomance = userPreferences.find(e => e.name === 'romance')?.value;

    const newComedy = ((oldComedy + item.comedy)/2).toFixed(2);
    const newAction = ((oldAction + item.action)/2).toFixed(2);
    const newHealth = ((oldHealth + item.health)/2).toFixed(2);
    const newSports = ((oldSports + item.sports)/2).toFixed(2);
    const newTragedy = ((oldTragedy + item.tragedy)/2).toFixed(2);
    const newRomance = ((oldRomance + item.romance)/2).toFixed(2);

    updatedPreferences.push({ name: 'comedy', value: Number(newComedy) });
    updatedPreferences.push({ name: 'action', value: Number(newAction) });
    updatedPreferences.push({ name: 'health', value: Number(newHealth) });
    updatedPreferences.push({ name: 'sports', value: Number(newSports) });
    updatedPreferences.push({ name: 'tragedy', value: Number(newTragedy) });
    updatedPreferences.push({ name: 'romance', value: Number(newRomance) });
    
    console.log(`Item was clicked ${item}`);

    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));

    window.location.href = '/dashboard';
    window.location.href = item.url;

    setUserPreferences(updatedPreferences);
  }

  return (
    <div className="App">
      <button type='button' className='logout-btn' onClick={() => navigate("/")}>
        <span className='fs-18 fw-6'>Log Out</span>
      </button>
      <h1 className="title">See The Latest News</h1>
      <div>
        <span>User preferences: </span><span>{displayPreferences}</span>
      </div>
      {/* <Menu active={active} setActive={setActive} setCategory={setCategory}/> */}
      <NewsGrid items={newsItems} clickOnItem={clickOnItem}/>


    </div>
  );
}

export default Dashboard;