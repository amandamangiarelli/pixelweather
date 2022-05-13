import React, { useState } from 'react';

const apiKey = {
  key: "0490f53b4c6c389a21dd786af70025c0",
  url: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${apiKey.url}weather?q=${query}$unit=imperial&APPID=${apiKey.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      ;
    }
  }

  const getDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${date}, ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.weather[0].main === "Clouds") 
          ? 'app cloudy' 
        : (weather.weather[0].main === "Rain")
          ? 'app rain'
        : (weather.weather[0].main === "Snow")
          ? 'app snow'
          : 'app') 
      : 'app'}>
      <main>
        <div className="searchBox">
          <input type="text" className="searchBar" placeholder="Enter location..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="locationBox">
            <div className="location">{weather.name}</div>
            <div className="date">{getDate(new Date())}</div>
          </div>
          <div className="weatherBox">
            <div className="temp">{Math.round(1.8 * ((weather.main.temp) - 273) + 32)}°F</div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>

          <div className="weatherInfo">
            <div className="additionalInfo">
              <h1>Feels Like</h1>
              <h2>{Math.round(1.8 * ((weather.main.feels_like) - 273) + 32)}°F</h2>
            </div>
            <div className="additionalInfo">
              <h1>Humidity</h1>
              <h2>{weather.main.humidity}%</h2>
            </div>
            <div className="additionalInfo">
              <h1>Wind Speed</h1>
              <h2>{Math.round(weather.wind.speed * 2.236936)}mph</h2>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;