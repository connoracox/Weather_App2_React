import React, { useState } from 'react'
import './App.css';

const api = {
  key: "c1687a820f446dd0081a7864a10635e0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key ==="Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? 
    ((weather.main.temp < 60) ? 'app cold' : 'app') : 'app'}>
      <main>
        <div className="searchDiv">
          <input type="text"
            className='searchBar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown ={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="locationBox">
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weatherBox'>
            <div className='temp'>
              <p>{Math.round(weather.main.temp)}℉</p>
            </div>
            <div className='conditions'>{weather.weather[0].main}</div><br />
            <div className='conditions2'>Low {Math.round(weather.main.temp_min)}℉ High {Math.round(weather.main.temp_max)}℉</div>
            <div className='conditions2'>Humidity {weather.main.humidity}%</div>

          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
