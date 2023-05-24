import { useEffect, useState } from "react";
import { getWeather } from "../../../../utils/apis/apis.jsx";
import './weather.scss'

function CurrentLocation() {
  const [loc, setLoc] = useState([]);
  const [temp, setTemp] = useState();
  const [weatherName, setWeatherName] = useState("");

  const WeatherSearch = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      getWeather(pos)
      .then(data => {
        setTemp(data.main.temp);
        setLoc(data.name)
        setWeatherName(data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
    })
  }

    useEffect(()=>{
      WeatherSearch()
    }, []);

    const renderWeatherImage = () => {
      if (weatherName === "Clear") {
        return <img alt="Clear" src="../imge/d_sun.png" width="120" height="100" />;
      } else if (weatherName === "Clouds") {
        return <img alt="Clouds" src="../imge/d_clouds.png" width="120" height="100" />;
      } else if (weatherName === "Rain") {
        return <img alt="rain" src="../imge/d_rain.png" width="120" height="100" />;
      }  else if (weatherName === "Wind") {
        return <img alt="Wind" src="../imge/d_wind.png" width="120" height="100" />;
      } else if (weatherName === "Storm") {
        return <img alt="ind" src="../imge/d_storm.png" width="120" height="100" />;
      }
      else {
        return null;
      }
    }
    
    
    return (
      <div className="WeatherContainer">
        <div className="WeatherContainer-top">
          {renderWeatherImage()}
        </div>

        <div className="WeatherContainer-bottom">
          <p>{temp !== undefined ? ` ${temp}℃` : '로딩중...'}</p>
          <p>{weatherName}</p>
          <p><span>{loc !== undefined ? `${loc}` : 'Loading...'}</span></p>
        </div>
      </div>
    );
}

export default CurrentLocation