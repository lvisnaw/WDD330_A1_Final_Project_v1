//JSON URL
const requestURL = 'https://lvisnaw.github.io/business.json#'; 

// PATH: https://lvisnaw.github.io/WDD330_A1_Final_Project_v1/business.json# this is not working and I don't understand github enough to fix it.

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
            business.name == 'Holiday Designs' ||
            business.name == 'SLV Design' ||
            business.name == 'Humanitarian'
        );
    //Pulling content from json file
    businessfilter.forEach((business) => {
        let card = document.createElement('section');
        let heading = document.createElement('div');
        let title = document.createElement('h2');
        let image = document.createElement('img');
        let events = document.createElement('p');
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
        // connect.setAttribute('target', '_blank');
        
        image.setAttribute('src', `images/${business.photo}`);
        image.setAttribute('alt', `${business.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('class', 'imgCard');
        
        //Building section
        connect.append(heading);
        heading.append(title);
        //heading.append(url);
        connect.append(info);
        //info.append(events);
        connect.append(image);
        card.append(connect);
        cards.append(card);
    });
})