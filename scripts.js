//=============================================== WEATHER APP ============================================


// Weather API credentials
const APIkey = '931fd2c657888a7ce24e207c3893d638'

const weatherCard = document.querySelector('.weatherCard')

// Creating Search for Location to search weat
const locationForm = document.querySelector('#form-data')
// creating event for weather search
locationForm.addEventListener('submit', (event) => {
    // preventing page from refreshing
    event.preventDefault()

    console.log(event)
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    console.log(event.target[2].value)
    // console.log(locationForm.name.value)
    // creating varibale with input from search

    const city = event.target[0].value
    const state = event.target[1].value
    const country = event.target[2].value

    // calling weatherData function
    weatherData(city, state, country)

})


// Creating async function to query weather data from the location search
async function weatherData(city, state, country){

    //------------------------- GEOCODING API ------------------------------------------
    // Need to use Geocoding API to convert coordinates to location names and vice cerse
    geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${APIkey}`
    const locationResponse = await fetch(geoUrl)
    
    // awaiting response from Geocoding API
    const locationData = await locationResponse.json()
    console.log(locationData)
    
    // setting variables for location name
    // const locationName = locationData[0].name
    const locationLatitude = locationData[0].lat
    const locationLongitude = locationData[0].lon
    // checking to see what the variables return
    // console.log(locationLatitude)
    // console.log(locationLongitude)

    //------------------------- WEATHER API ------------------------------------------    
    //now that we have latitude and longitude of locations, we can use those variables to fetch data from Weather API
    
    // fetching data from weather api   
    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locationLatitude}&lon=${locationLongitude}&units=imperial&appid=${APIkey}`
    const weatherResponse = await fetch(weatherUrl)

    // awaiting response from Weather API
    const weatherData = await weatherResponse.json()
    console.log(weatherData)

    displayWeather(weatherData)
}


function displayWeather(weatherData){
    
    // setting variables for weather information I want to display on my page
    const locationName = weatherData.name
    const locationState = weatherData.state
    // console.log(locationName)   

    // CODE BEFORE CHANGING UNITS TO IMPERIAL IN URL
        // const currentTempK = weatherData.main.temp
        // conversion from Kelvin to Farenheit
        // const currentTemp = Math.floor((currentTempK- 273.15) * 9/5 + 32)
        // console.log(currentTemp + '°F')
        // const currentFeelsLikeK = weatherData.main.feels_like
        // const currentFeelsLike = Math.floor((currentFeelsLikeK- 273.15) * 9/5 + 32)
        // console.log(currentFeelsLike + '°F')


    const currentTempImp = Math.floor(weatherData.main.temp)
    const currentFeelsLikeImp = Math.floor(weatherData.main.feels_like)
    
    const currentHumidity = weatherData.main.humidity
    const currentWindspd = weatherData.wind.speed
    // console.log(currentHumidity)
    const currentWeatherDescription = weatherData.weather[0].description
    // console.log(currentWeatherDescription)
    const currentWeatherIcon = weatherData.weather[0].icon

    

    // calculating current time 
    const today = new Date()
    const currentDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear()
    const currentTime = today.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12: true})

    

    weatherCard.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title">${locationName}</h2>
            <h6 class="card-time">${currentDate}  |  ${currentTime}</h6>
            <p class="card-text">${currentWeatherDescription}</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Current Temp: ${currentTempImp}°F</li>
                <li class="list-group-item">Feels Like: ${currentFeelsLikeImp}°F</li>
                <li class="list-group-item">Humidity: ${currentHumidity}%</li>
                <li class="list-group-item">Wind Speed: ${currentWindspd}</li>
            </ul>
        </div>
    </div>
    `
}