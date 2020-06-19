import React, { useState, Fragment } from 'react'
import { fetchWeather } from './api/fetchWeather'
import './App.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query)
      console.log(data)
      setWeather(data)
      setQuery('')
      const date = new Date()
      console.log(date)
    }
  }
  return (
    <Fragment>
      <div className="main-container">
        <h1 className="heading animated bounce">Weather <span className="textColor">App</span></h1>
        <input type="text" placeholder="Enter City Name..." className="search animated wobble" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
        {weather.main && (
          <div className="city animated slideInLeft">
            <h2 className="city-name  animated wobble">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp animated swing">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info animated swing">
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="city-details animated slideInUp">
              <p>{`longitude: ${weather.coord.lon}`}</p>
              <p>{`latitude: ${weather.coord.lat}`}</p>
            </div>
            <div className="city-details animated slideInUp">
              <p>{`Humidity: ${weather.main.humidity}`}</p>
              <p>{`Feels-Like: ${weather.main.feels_like}`}<span>&deg;C</span></p>
            </div>
          </div>
        )}
      </div>
      <div class="page-footer">
        <p title="9137625108">Developed By: Shehbaz Ansari</p>
      </div>
    </Fragment>
  )
}

export default App
