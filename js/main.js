// import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

// Function to add "active" class to the appropriate navigation item
function setActiveNavItem() {
    // Get the current page URL
    var currentPageUrl = window.location.href;
    
    // Select the navigation items
    var navItems = document.querySelectorAll('#primaryNav li');

    // Loop through each navigation item
    navItems.forEach(function(item) {
        // Get the link from the navigation item
        var link = item.querySelector('a').href;
        
        // Check if the current page URL contains the link (partial match)
        if (currentPageUrl.includes(link)) {
            // Add the "active" class to the matching navigation item
            item.classList.add('active');
        }
    });
}

// Call the function to set the active navigation item when the page loads
window.onload = setActiveNavItem;

// Product Cards
const base = 200; // Fixed base size for all cards
const images = [
  "pumpkin-set.jpg",
  "necklas-brwn.jpg",
  "kids-knit-hat.jpg"
];
const titles = [
  "Pumpkin Set",
  "Necklace",
  "Kids Hat for donation only"
];
const paragraphs = [
  "Description of Product 1 goes here.",
  "Description of Product 2 goes here.",
  "Description of Product 3 goes here."
];

function initializeArray(qty) {
  return [...Array(qty)].map((_, index) => {
    return {
      height: base,
      width: base,
      src: "../images/" + images[index % images.length],
      title: titles[index % titles.length],
      paragraph: paragraphs[index % paragraphs.length]
    };
  });
}

function createCards(list, selector) {
  const container = document.querySelector(selector);
  list.forEach((card) => {
    container.appendChild(createCard(card));
  });
}

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.style.width = card.width + "px";
//   cardElement.style.height = card.height + "%";
  cardElement.classList.add("card", "prodCard");
  const img = new Image();
  img.src = card.src;
  img.classList.add("imgFade");
  cardElement.appendChild(img);
  const title = document.createElement("h2");
  title.innerText = card.title;
  cardElement.appendChild(title);
  const paragraph = document.createElement("p");
  paragraph.innerText = card.paragraph;
  cardElement.appendChild(paragraph);
  const button = document.createElement("button");
  button.innerText = "Add To Cart";
  button.classList.add("cart-bttn"); // Add class "cart-bttn"
  cardElement.appendChild(button);
  return cardElement;
}

createCards(initializeArray(3), ".row-grid");