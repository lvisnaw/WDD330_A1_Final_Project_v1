// New code to update cart count when item is removed from cart
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// New code to render a list with a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (!parentElement) {
    console.error("Parent element is null.");
    return; // Exit function if parentElement is null
  }

  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// New code to load a template
export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
   if(callback) {
    callback(data);
   }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

// New CODE: Begin
// Function to remove item from cart
function removeItemFromCart(index) {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  if (Array.isArray(cartItems)) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    // Update total after removing item
    updateTotal(cartItems);
    // Update cart count after removing item
    updateCartCount(-1);
    renderCartContents();
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
}

// Function to update cart count
export function updateCartCount(change) {
  let cartCount = getLocalStorage("cart-count") || 0;
  cartCount = parseInt(cartCount) + change;
  setLocalStorage("cart-count", cartCount);
  const cartCountEl = document.querySelector("#cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = cartCount;
    const cartCountContainer = document.querySelector("#cart-count-container");
    if (cartCountContainer) {
      cartCountContainer.className = "count-container-format";
    }
  }
}
// NEW CODE END

// Function to load header and footer templates
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("../partials/header.html");
  const footerTemplateFn = loadTemplate("../partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  await renderWithTemplate(headerTemplateFn, headerEl);
  await renderWithTemplate(footerTemplateFn, footerEl);

  // Update cart count after DOMContentLoaded event
  const cartCountEl = document.querySelector("#cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = "";
    cartCountEl.textContent = getLocalStorage("cart-count") || "";
    if (getLocalStorage("cart-count")) {
      const cartCountContainer = document.querySelector("#cart-count-container");
      if (cartCountContainer) {
        cartCountContainer.className = "count-container-format";
      }
    }
  }
}

// Function to display an alert message
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

// Function to remove all alerts
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}