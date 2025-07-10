import "./index.css";
import "./App.css";
import { useState } from "react"; 
import axios from 'axios'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = 'fcfaf0818da217777c06dcd0a334a398'
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      setWeather(response.data)
      console.log(response.data)
    } catch (error){
      console.error('Error fetching weather:' , error)
      setWeather(null)
    }
  }
  const handleChange = (e) => {
    setCity(e.target.value)
  }



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold text-black mb-4">Weather App</h1>
      <input
      value={city}
      onChange={handleChange}
        type="text"
        placeholder="Enter a city name"
        className="px-4 py-2 border rounded-md"
        name="city"
      />
      <button className="bg-blue-500 text-white p-2 mt-2 rounded-md" onClick={fetchWeather}>
        Get Weather
      </button>
      <div className="bg-white p-6 mt-2 rounded shadow-md text-center w-72">
        {weather && (
          <div>
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <p className="text-lg">{weather.timezone}</p>
            <p className="text-lg">{weather.main.temp}</p>
            <p className="text-lg">{weather.weather[0].main}</p>
            <p className="text-lg">{weather.weather[0].description}</p>
            <p className="text-lg">{weather.weather[0].icon}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
