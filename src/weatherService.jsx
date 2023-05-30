const API_KEY = "88ef365e4b3f02481c2df7d5c2e14130";

const makeIconURL =(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`

export const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
    console.log("data",data)
    const {
        weather,
        main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
        wind:{speed},
        sys:{country},
        name,
    }=data;
    const {description,icon}= weather[0];
    return {
        description,
        iconUrl:makeIconURL(icon),
        temp,
        temp_max,
        temp_min,
        feels_like,
        pressure,
        humidity,
        speed,
        country,
        name, };
};
