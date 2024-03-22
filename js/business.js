//JSON URL
const requestURL = 'https://lvisnaw.github.io/business.json#';

//Fetching Data from JSON URL
fetch(requestURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); // temporary checking for valid response and data parsing
        const business = jsonObject['business'];
        const cards = document.querySelector('.businesses');
        //Filter for specific towns
        const businessfilter = business.filter(
            (business) =>
            business.name == 'Allens Camera' ||
            business.name == 'Moxtek' ||
            business.name == 'Sun River Gardens'
        );
    //Pulling content from json file
    businessfilter.forEach((business) => {
        let card = document.createElement('section');
        let heading = document.createElement('div');
        let title = document.createElement('h2');
        //let motto = document.createElement('h3');
        let image = document.createElement('img');
        let events = document.createElement('p');
        //let population = document.createElement('p');
        let url = document.createElement('p');
        let info = document.createElement('div');
        let connect = document.createElement('a');
    
        //Page layout
        title.innerHTML = `${business.name}`;
        url.innerHTML = `${business.url}`;
        url.innerHTML = `<br>Website - ${business.url}`;
        events.innerHTML = `Events<br> - ${business.events}<br><br>`;
        
        //Adding class
        info.setAttribute('class', `info`);
        heading.setAttribute('class', 'title');
        
        //Image call from local file
        let location = `${business.photo}`;
        let local = location.replace('jpg', 'html');
        
        connect.setAttribute('href', `${business.url}`);
        connect.setAttribute('target', '_blank');
        
        image.setAttribute('src', `images/${business.photo}`);
        image.setAttribute('alt', `${business.name}, Town`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('class', 'imgCard');
        
        //Building section
        connect.append(heading);
        heading.append(title);
        heading.append(url);
        connect.append(info);
        info.append(events);
        //info.append(population);
        //info.append(rain);
        connect.append(image);
        card.append(connect);
        cards.append(card);
    });
})

    /* Preston Events 

    const prestonEventURL = "https://lvisnaw.github.io/business.json#";

    fetch(prestonEventURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (prestonObject) {
            const towns = prestonObject['towns'];
            for (let i = 0; i < towns.length; i++) {
                if (towns[i].name == 'Preston') {
                    let preston = document.createElement('div');
                    for (let x = 0; x < towns[i].events.length; x++) {
                        let info = document.createElement('p');
                        info.textContent = towns[i].events[x];
                        preston.appendChild(info);
                        document.getElementById('preston').appendChild(preston);
                    }
                }
            }

        }) */