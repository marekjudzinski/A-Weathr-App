import React, { useState } from 'react';
import './app.scss';

//API pobrane ze strony
const api = {
  key: "1888de5ce7f3f7ad61a0165ebc58fab7",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  //zapytanie bedzie stringiem
  const [query, setQuery] = useState('');
  //pogoda obiektem
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        })
    }
  }

 //To co mysle ze sie tutaj dzieje to:
 //w funckji odpowiedzialnej za pobranie i zwrocenie stringa z AKTUALNA data.
  const dateBuilder = (d) => {
    //Tworzymy zmienne. Tablice z miesiacami i dniami tygodnia.
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    //Dzien i miesiac beda pobierane z tablic metodami date
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    //data i rok z argumentu funckji
    let date = d.getDate();
    let year = d.getFullYear();
    //zwracamy string z data
    return `${day} ${date} ${month} ${year}`
  }

  //Struktura mojego dokumentu
  return (
    //ClassName calej aplikacji jest zalezny od wysokosci temperatury.
    //Od wysokosci temperatury zalezy tez background img
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>      
  )
}

export default App;
