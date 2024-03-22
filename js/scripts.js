function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

function myMap() {
var mapProp= {
  center:new google.maps.LatLng(42.096275515877885, -111.87731379881829),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

const options1 = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', options1);
const options2 = {year: 'numeric'};
document.getElementById('currentYear').textContent = new Date().toLocaleDateString('en-US', options2);

const today = new Date();
console.log(today);
        
const dayNumber = today.getDay();
console.log(dayNumber);
        
const element = document.getElementById("message");
        
if (dayNumber == 5) {
    element.classList.add("showme");
} else {
    element.classList.add("hideme");
}