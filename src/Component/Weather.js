import React, {useState, useEffect} from 'react'
import { WiThermometer, WiHumidity } from "react-icons/wi";

function Weather() {
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState('Mumbai');
    const key = ''
    useEffect(() => {
        sendData();
    },[])
   
    const sendData = () => {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`
          )
            .then((res) => {
              if (res.ok) {
                console.log(res.status);
                return res.json();
              } else {
                if (res.status === 404) {
                  return alert("Oops, there seems to be an error!(wrong location)");
                }
                alert("Oops, there seems to be an error!");
                throw new Error("You have an error");
              }
            })
            .then((object) => {
              setWeather(object);
              console.log(weather);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className= 'wrapper'>
            <div className='searchbar'>
                <input
                type='search'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='Enter location'
                className='location_input'
                />
                <button className='btn' onClick={()=>sendData()}>Submit</button>
            </div>
            <div className='appdata'>
                <h3 className='temp'>weather forecast in {location}</h3>
                <p className='temp'><WiThermometer /> {weather?.main?.temp}°C</p>
                <p className='temp'><WiHumidity /> {weather?.main?.humidity}%</p>
            </div>    
        </div>
    )
}

export default Weather
