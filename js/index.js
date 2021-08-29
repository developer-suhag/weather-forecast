const getWeatherDate = async () => {
    // get search field
    const searchedCity = document.getElementById('searched-city');
    const cityName = searchedCity.value;
    // fetch data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cc3b56ef1c477f72c7273d5c5abb66fe`;
    const res = await fetch(url);
    const data = await res.json()
    // error handle
    if (data.cod == 404) {
        alert(data.message)
        searchedCity.value = '';
    } else if (cityName == '') {
        alert('Please Enter a city name')
    } else {
        getTemp(data);
        searchedCity.value = '';
    }
};



const getTemp = (temp) => {
    // get weather details div
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = ''
    // get url for image / icon
    const iconUrl = 'http://openweathermap.org/img/w/';
    // create div
    const div = document.createElement('div');
    div.innerHTML = `
        <div>
            <img src="${iconUrl}${temp.weather[0].icon}.png" alt="weather-icon" />
        </div>
        <div class="my-4 text-white">
            <h2 class="fs-1">${temp.name}, ${temp.sys.country}</h2>
            <h3>Temp: ${Math.round(temp.main.temp)}<sup>°</sup>C</h3>
            <h4>Feels like: ${Math.round(temp.main.feels_like)}<sup>°</sup>C</h4>
            <h5>Max temp: ${Math.round(temp.main.temp_max)} - Min temp: ${Math.round(temp.main.temp_min)}</h5>
            <h4 class="text-capitalize">Weather: ${temp.weather[0].description}</h4>
            <p>Wind: ${temp.wind.speed} Km / h</p>

        </div>
    `;
    // append div
    weatherDetails.appendChild(div)
};