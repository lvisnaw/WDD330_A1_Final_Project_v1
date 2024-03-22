import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img
                src="${product.Images.PrimaryMedium}" 
                alt="Image of ${product.Name}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

// Code to determine if image is broken, if broken then do not display product.
// async function filterProducts(products) {
//     const filteredProducts = [];
//     for (const product of products) {
//         try {
//             // Check if image returns a valid response
//             const response = await fetch(product.Image);
//             if (response.ok) {
//                 filteredProducts.push(product);
//             }
//         } catch (error) {
//             console.error("Error checking image:", error);
//         }
//     }
//     return filteredProducts;
// }

// New code
// export default async function productList(selector, category) {
//   // Wait for DOMContentLoaded event before executing the code
//   window.addEventListener("DOMContentLoaded", async () => {
//     const el = document.querySelector(selector);
//     const products = await getData(category);
//     // const filteredProducts = await filterProducts(products);
//     console.log(products);
//     renderListWithTemplate(productCardTemplate, el, products);
    
//     // Check if element with class 'title' exists before setting its innerHTML
//     const titleElement = document.querySelector(".title");
//     if (titleElement) {
//       titleElement.innerHTML = category;
//     } else {
//       console.error("Element with class 'title' not found.");
//     }
//   });
// }

// Original code
export default async function productList(selector, category) {
    const el = document.querySelector(selector);
    const products = await getData(category);
    // const filteredProducts = await filterProducts(products);
    console.log(products);
    renderListWithTemplate(productCardTemplate, el, products);
    document.querySelector(".title").innerHTML = category;
}
