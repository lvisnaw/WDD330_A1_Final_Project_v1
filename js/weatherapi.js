//JSON URL
const apiURL = '//api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=f0af057df16329fc66d52dd104cebd2d';

fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject); //Used to see data from api call and find errors
        document.getElementById('current-temp').textContent = jsObject.main.temp;
        const imagesrc = 'http://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';
        const desc = jsObject.weather[0].description;
        document.getElementById('imagesrc').textContent = imagesrc;
        document.getElementById('icon').setAttribute('src', imagesrc);
        document.getElementById('icon').setAttribute('alt', desc);
    });