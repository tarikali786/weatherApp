import winter from "./assets/winter.jfif"
// import cloud from "./assets/cloud_sun.png"
import { Description } from "./component/discription"
import "./App.css"
import { useEffect, useState } from "react"
import { getFormattedWeatherData } from "./weatherService"

function App() {
  const [city, setCity] = useState("London")
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState("metric")
  

  async function fetchWeatherReport() {
    const data = await getFormattedWeatherData(city, units)
    setWeather(data)
  }

  useEffect(() => {
    fetchWeatherReport()
  }, [units, city])

  const handleUnitsClick = (e) => {
    const button = e.currentTarget
    const currentUnit = button.innerText.slice(1)

    const isCelcius = currentUnit === "C"
    console.log("isCelcius", isCelcius)

    button.innerText = isCelcius ? "ºF" : "ºC"

    setUnits(isCelcius ? "metric" : "imperial")
  }

  const handleInputChange = (e) => {
    setCity(e.target.value)
  }

  return (
    <>
      <div
        className="weather__app__container"
        style={{ backgroundImage: `url(${winter})` }}
      >
        <div className="overlay">
          {weather && (
            <div className="container">
              <div className="section section_inputs">
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City..."
                  value={city}
                  onChange={handleInputChange}
                />
                <button onClick={(e) => handleUnitsClick(e)}>ºF</button>
              </div>

              <div className="section section_temperature">
                <div className="icon">
                  <h3>{`${weather.name},${weather.country}`}</h3>
                  {/* <img src={cloud} alt="weatherIcon"/> */}
                  <img src={weather.iconUrl} alt="weatherIcon" />

                  <h3>{weather.description}</h3>
                </div>
                <div className="tempereture">
                  <h2>{`${weather.temp.toFixed()} º${
                    units === "metric" ? "C" : "F"
                  }`}</h2>
                </div>
              </div>
              <Description weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
