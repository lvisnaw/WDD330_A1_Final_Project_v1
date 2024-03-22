// Code to render cart total: BEGIN
// New JS code for adding items and displaying total
import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

renderListWithTemplate();

export default function ShoppingCart() {
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  addRemoveEventListeners();
    updateTotal(cartItems); // Update total initially
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button" data-index="${index}">X</button>
  </li>`;

  return newItem;
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    addRemoveEventListeners();
    updateTotal(cartItems); // Update total after rendering
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
}

// function addRemoveEventListeners() {
//   const removeButtons = document.querySelectorAll(".remove-button");
//   removeButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const index = button.dataset.index;
//       removeItemFromCart(index);
//     });
//   });
// }

// New functioin to remove cart item when remove button is clicked
function addRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default action (e.g., navigating to a link)
      const index = button.dataset.index;
      console.log("Button clicked, index:", index);
      removeItemFromCart(index);
    });
  });
}


function removeItemFromCart(index) {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  if (Array.isArray(cartItems)) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    updateCartCount(-1); // Update cart count after removing item
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
}

function updateTotal(cartItems) {
  const totalElement = document.querySelector(".list-total");
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.FinalPrice), 0);
  totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

renderCartContents();

// Code to render cart total: END