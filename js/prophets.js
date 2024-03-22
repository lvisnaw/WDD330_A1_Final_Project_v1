const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    //console.table(jsonObject); // temporary checking for valid response and data parsing
   
const prophets = jsonObject['prophets'];
for (let i=0; i < prophets.length; i++) {
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let image = document.createElement('img');
    let bDay = document.createElement('p');
    let bPlace = document.createElement('p');
    let year = document.createElement('p')
    let mybr = document.createElement('br');
    let imgTag = prophets[i].name + ' ' + prophets[i].lastname;
    
    h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
    year.textContent = 'Prophet for ' + prophets[i].length + ' years';
    bDay.textContent = 'Birth Day: ' + prophets[i].birthdate;
    bPlace.textContent = 'Birth Place: ' + prophets[i].birthplace;
    mybr.textContent = prophets[i];
    
    
    card.appendChild(h2);
    card.appendChild(year);
    card.appendChild(bDay);    
    card.appendChild(bPlace);
    card.appendChild(mybr);
    card.appendChild(image);
    
    
    image.setAttribute('src', prophets[i].imageurl);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('alt', prophets[i].name + ' ' + prophets[i].lastname + ' - ' + prophets[i].length);
    
    document.querySelector('div.cards').appendChild(card);
}    
});
