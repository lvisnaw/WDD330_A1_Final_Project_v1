//JSON URL
const apiURL = '//api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=f0af057df16329fc66d52dd104cebd2d'

//const towns = jsonObject['towns'];
//const cards = document.querySelector('.fiveDayForcast');

const weatherDate = new Date();
const weatherDay = weatherDate.getDay();
let forecastDayNumber = weatherDay;
const weekDay = new Array(7);
weekDay[0] = "Sunday";
weekDay[1] = "Monday";
weekDay[2] = "Tuesday";
weekDay[3] = "Wednesday";
weekDay[4] = "Thursday";
weekDay[5] = "Friday";
weekDay[6] = "Saturday";

const weatherForcast = (forecastData, dayOfWeek) => {
    
    //Create Cards
    let card = document.createElement('section');
    //let subSection = document.createElement('div');
    let title = document.createElement('h4');
    let weatherIcon = document.createElement('img');
    let iconCode = forecastData.weather[0].icon;
    let iconPath = `//openweathermap.org/img/w/${iconCode}.png`;
    let forecastTemp = document.createElement('p');

    //Add class
    //card.classList.add('fiveDayImgPlaceHolder');
    //card.classList.add('fiveDayForcast');
    //card.classList.add('visible');
    card.classList.add('center');
    card.classList.add('fDay');
    //subSection.classList.add('leon');

    //Building section
    document.getElementById('fCard').appendChild(card);
    //subSection.setAttribute('class', 'title'); 
    title.textContent = dayOfWeek;      
    weatherIcon.src = iconPath;
    weatherIcon.setAttribute('alt', forecastData.weather[0].description);
    weatherIcon.classList.add('imgFDay');
    forecastTemp.textContent = Math.round(forecastData.main.temp * 10) / 10 + '\xb0 F';    
    
    //Add context
    //connect.append(subSection);
    card.appendChild(title);
    card.appendChild(weatherIcon);
    card.appendChild(forecastTemp);
}

fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        const forecastList = jsObject.list

        // Weather Summary
        document.getElementById('currentWeather').textContent = jsObject.list[0].weather[0].description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        document.getElementById('currentTemp').textContent = Math.round(jsObject.list[0].main.temp * 10)/10 + '\xb0 F';
        document.getElementById('humidity').textContent = jsObject.list[0].main.humidity + '%';
        document.getElementById('windSpeed').textContent = Math.round(jsObject.list[0].wind.speed *10)/10 + ' mph';
        const f = parseFloat(jsObject.list[0].main.temp)
        const s = parseFloat(jsObject.list[0].wind.speed)
        
        // Calulates windchill and returns results to function doInputOutput()
        // Formula = 35.74 + 0.6215 * tempF - 35.75 * wSpeed^0.16 + 0.4275 * tempF * wSpeed^0.16
        let windChill = Math.round(35.74 + (0.6215 * f) - (35.75 * Math.pow(s, 0.16)) + (0.4275 * f * Math.pow(s, 0.16)));
        
        if (f >= 52 || s <= 3) {
            document.getElementById('windChill').textContent = 'N/A'
        } else {
            document.getElementById('windChill').textContent = windChill + '\xb0 F'
        }

        // Five Day Forecast
        for (let i = 0; i < forecastList.length; i++) {
            let time = forecastList[i].dt_txt;
            if (time.includes('18:00:00')) {
                forecastDayNumber += 1;
                if (forecastDayNumber === 7) {
                    forecastDayNumber = 0
                }
                weatherForcast(forecastList[i], weekDay[forecastDayNumber])
            }
        }
    });