import React, { useState, useEffect } from 'react';
import axios from 'axios';
const tokens = require('../../config.js');

const App = () => {
  const [locationText, setLocationText] = useState('');
  const [appState, setAppState] = useState('submit');
  const [placesList, setPlacesList] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [imageURL, setImageURL] = useState('https://i.imgur.com/tigb3PX.jpg')

  useEffect(() => {
    if (currentSelection !== null) {
      let lat = currentSelection.geometry.location.lat;
      let lng = currentSelection.geometry.location.lng;
      let htmlLink = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=500x500&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${tokens.googleAPIKey}`;
      setImageURL(htmlLink);
    }
  }, [currentSelection]);

  function handleSubmit(e) {
    setAppState('searching');
    axios.get(`/api/cordSearch?address=${locationText}`)
      .then(res => {
        setPlacesList(res.data);
        setAppState('found');
        setCurrentSelection(res.data[Math.floor(Math.random() * res.data.length)]);
      });
    e.preventDefault();
  }

  function handleCurrentSearch() {
    window.open(`https://www.google.com/maps/search/?api=1&query=${currentSelection.name}%20${currentSelection.vicinity}&query_place_id=${currentSelection.place_id}`);
  }

  function handleChange() {
    setCurrentSelection(
      placesList[
      Math.floor(Math.random() * placesList.length)
      ]
    );
  }

  function renderCurrentSelection() {
    if (currentSelection !== null) {
      return <div id='currentSelection'>
        <p onClick={handleCurrentSearch}>Found Place: {currentSelection.name}</p>
        <button onClick={handleChange}>Find Another Place</button>
      </div>
    }
  }

  return (
    <>
      <h1>FoodFinder</h1>
      <h3>Enter your location below to find a place to eat in the area!!</h3>
      <form id='locationSearch' onSubmit={handleSubmit}>
        <input type='text' value={locationText} onChange={(e) => { setLocationText(e.target.value); }} />
        <input type='submit' value={appState} disabled={appState === 'searching'} />
      </form>

      <img id='primaryDisplay' src={imageURL} />
      {renderCurrentSelection()}
    </>
  )
}

export default App;