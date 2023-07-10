const input = document.getElementById("cityInput");
const search = document.getElementById("enter");
const test = document.getElementsByClassName("test");
const containers = document.getElementsByClassName("containers");
const forecasts = document.getElementsByClassName("forecasts");

const apiKeys = "6fefa91442d56ea7e16d7a748641cf60";

// const creatWewatherCard = (item) => {
//   return `

//   `;
// };

// ! part two ::::::
const getWeatherDet = (cityName, lat, lon) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeys}`;
  const apiDet = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    // ! Five days data ::
    const uniqeForecastDays = [];
    const fiveDaysData = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqeForecastDays.includes(forecastDate)) {
        return uniqeForecastDays.push(forecastDate);
      }
    });
    // console.log(fiveDaysData);
    fiveDaysData.forEach((item) => {
      // creatWewatherCard(item);
      // console.log(item);
    });
  };
  apiDet(url);
};

//! part one :::::::

const getCity = () => {
  const cityName = input.value.trim();
  if (!cityName) return;
  const api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKeys}`;

  const apiLoad = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    if (!data.length) return alert(`No coordinates found for ${cityName}`);
    console.log(data);
    test.innerHTML = data.name.split(" ")[0];
    const { name, lat, lon } = data[0];
    getWeatherDet(name, lat, lon);
  };
  apiLoad(api);
};

search.addEventListener("click", getCity);
