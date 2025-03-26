function lapTopFilter() {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
  )
    .then((response) => {
      if (!response.ok) {
        console.log("Bad Connection");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      data.products.forEach((element) => {
        if (element.category.name === "laptops") {
          createCardForItems(element, boxOne);
        }
      });
    });
}
function mobilesFilter() {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
  )
    .then((response) => {
      if (!response.ok) {
        console.log("Bad Connection");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      data.products.forEach((element) => {
        if (element.category.name === "phones") {
          createCardForItems(element, boxOne);
        }
      });
    });
}
let brandsList = document.querySelector(".brandsList");
brandsList.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    let selectedBrand = event.target.textContent.toLowerCase();
    filterByBrand(selectedBrand);
  }
});
function filterByBrand(brandName) {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
  )
    .then((response) => response.json())
    .then((data) => {
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      let filteredProducts = data.products.filter(
        (product) => product.brand.toLowerCase() === brandName
      );
      filteredProducts.forEach((element) => {
        createCardForItems(element, boxOne);
      });
    });
}
let minPriceInp = document.getElementById("minPriceInp");
let maxPriceInp = document.getElementById("maxPriceInp");
let priceBtn = document.querySelector(".forPriceFilter");
priceBtn.addEventListener("click", filterByPrice);
function filterByPrice() {
  let minPrice = parseFloat(minPriceInp.value) || 0;
  let maxPrice = parseFloat(maxPriceInp.value) || Infinity;
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
  )
    .then((response) => {
      if (!response.ok) {
        console.log("Bad Connection");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      data.products.forEach((element) => {
        if (
          element.price.current >= minPrice &&
          element.price.current <= maxPrice
        ) {
          createCardForItems(element, boxOne);
        }
      });
    });
}
let starBtn = document.querySelector(".forRatings");
starBtn.addEventListener("click", filterByRating);
function filterByRating() {
  let starInp = document.getElementById("ratings");
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
  )
    .then((response) => {
      if (!response.ok) {
        console.log("Bad Connection");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      data.products.forEach((element) => {
        if (element.rating <= starInp.value) {
          createCardForItems(element, boxOne);
        }
      });
    });
}
let search = document.getElementById("srch");
search.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchBar();
  }
});
function searchBar() {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
  )
    .then((response) => {
      if (!response.ok) {
        console.log("Bad Connection");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      data.products.forEach((element) => {
        if (element.title.toLowerCase().includes(search.value.toLowerCase())) {
          createCardForItems(element, boxOne);
        }
      });
    });
}
function createCardForItems(element, boxOne) {
  // CARD ELEMENTS
  let card = document.createElement("div");
  let cardDiscount = document.createElement("div");
  let productImage = document.createElement("div");
  let cardImg = document.createElement("img");
  let forNamePrice = document.createElement("div");
  let productName = document.createElement("div");
  let productDiscountPrice = document.createElement("div");
  let price = document.createElement("div");
  let discount = document.createElement("div");
  let rateAndCart = document.createElement("div");
  let rating = document.createElement("div");
  let cartIcon = document.createElement("i");
  let addToCart = document.createElement("div");
  // CLASS AND CONTENT
  card.classList.add("card");
  cardDiscount.classList.add("cardDiscount");
  cardDiscount.textContent = `-${Math.round(
    element.price.discountPercentage
  )}%`;
  cardImg.setAttribute("src", element.thumbnail);
  productImage.classList.add("productImage");
  forNamePrice.classList.add("forNamePrice");
  productName.classList.add("productName");
  rateAndCart.classList.add("rateAndCart");
  productName.textContent = element.title;
  productDiscountPrice.classList.add("productDiscountPrice");
  price.classList.add("price");
  price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
  discount.classList.add("discount");
  discount.textContent = `${Math.round(element.price.current)} ${
    element.price.currency
  }`;

  if (element.price.discountPercentage === 0) {
    cardDiscount.style.display = "none";
    price.style.display = "none";
  }
  rating.classList.add("rating");
  rating.textContent = `★${element.rating.toFixed(1)}`;
  addToCart.classList.add("addToCart");
  cartIcon.className = "fa-cart-shopping fa-solid";
  addToCart.textContent = `Add `;
  // APPEND
  card.appendChild(productImage);
  card.appendChild(cardDiscount);
  card.appendChild(forNamePrice);
  card.appendChild(rateAndCart);
  productImage.appendChild(cardImg);
  forNamePrice.appendChild(productName);
  forNamePrice.appendChild(productDiscountPrice);
  productDiscountPrice.appendChild(discount);
  productDiscountPrice.appendChild(price);
  rateAndCart.appendChild(rating);
  rateAndCart.appendChild(addToCart);
  addToCart.appendChild(cartIcon);
  boxOne.appendChild(card);
  productName.addEventListener("click", () => {
    window.location.href = `product.html?id=${element._id}`;
    displayProductDetails(element);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("_id");
  if (productId) {
    fetch(`https://api.everrest.educata.dev/shop/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        displayProductDetails(data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }
});
function displayProductDetails(element) {
  let productContainer = document.querySelector(".productDetails");
}

// function lapTopFilter() {
//     fetch(
//       "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           console.log("Bad Connection");
//           return;
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let boxOne = document.querySelector(".mainBox");
//         boxOne.innerHTML = "";
//         data.products.forEach((element) => {
//           if (element.category.name === "laptops") {
//             // CARD ELEMENTS
//             let card = document.createElement("div");
//             let cardDiscount = document.createElement("div");
//             let productImage = document.createElement("div");
//             let cardImg = document.createElement("img");
//             let forNamePrice = document.createElement("div");
//             let productName = document.createElement("div");
//             let productDiscountPrice = document.createElement("div");
//             let price = document.createElement("div");
//             let discount = document.createElement("div");
//             let rateAndCart = document.createElement("div");
//             let rating = document.createElement("div");
//             let cartIcon = document.createElement("i");
//             let addToCart = document.createElement("div");
//             // CLASS AND CONTENT
//             card.classList.add("card");
//             cardDiscount.classList.add("cardDiscount");
//             cardDiscount.textContent = `-${Math.round(
//               element.price.discountPercentage
//             )}%`;
//             cardImg.setAttribute("src", element.thumbnail);
//             productImage.classList.add("productImage");
//             forNamePrice.classList.add("forNamePrice");
//             productName.classList.add("productName");
//             rateAndCart.classList.add("rateAndCart");
//             productName.textContent = `${element.title}`;
//             productDiscountPrice.classList.add("productDiscountPrice");
//             price.classList.add("price");
//             price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
//             discount.classList.add("discount");
//             discount.textContent = `${Math.round(element.price.current)} ${
//               element.price.currency
//             }`;
//             if (element.price.discountPercentage === 0) {
//               cardDiscount.style.display = "none";
//               price.style.display = "none";
//             }
//             rating.classList.add("rating");
//             rating.textContent = `★${element.rating.toFixed(1)}`;
//             addToCart.classList.add("addToCart");
//             cartIcon.className = "fa-cart-shopping fa-solid";
//             addToCart.textContent = `Add `;
//             // APPEND
//             card.appendChild(productImage);
//             card.appendChild(cardDiscount);
//             card.appendChild(forNamePrice);
//             card.appendChild(rateAndCart);
//             productImage.appendChild(cardImg);
//             forNamePrice.appendChild(productName);
//             forNamePrice.appendChild(productDiscountPrice);
//             productDiscountPrice.appendChild(discount);
//             productDiscountPrice.appendChild(price);
//             rateAndCart.appendChild(rating);
//             rateAndCart.appendChild(addToCart);
//             addToCart.appendChild(cartIcon);
//             boxOne.appendChild(card);
//           }
//         });
//       });
//   }
//   function mobilesFilter() {
//     fetch(
//       "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           console.log("Bad Connection");
//           return;
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let boxOne = document.querySelector(".mainBox");
//         boxOne.innerHTML = "";
//         data.products.forEach((element) => {
//           if (element.category.name === "phones") {
//             // CARD ELEMENTS
//             let card = document.createElement("div");
//             let cardDiscount = document.createElement("div");
//             let productImage = document.createElement("div");
//             let cardImg = document.createElement("img");
//             let forNamePrice = document.createElement("div");
//             let productName = document.createElement("div");
//             let productDiscountPrice = document.createElement("div");
//             let price = document.createElement("div");
//             let discount = document.createElement("div");
//             let rateAndCart = document.createElement("div");
//             let rating = document.createElement("div");
//             let cartIcon = document.createElement("i");
//             let addToCart = document.createElement("div");
//             // CLASS AND CONTENT
//             card.classList.add("card");
//             cardDiscount.classList.add("cardDiscount");
//             cardDiscount.textContent = `-${Math.round(
//               element.price.discountPercentage
//             )}%`;
//             cardImg.setAttribute("src", element.thumbnail);
//             productImage.classList.add("productImage");
//             forNamePrice.classList.add("forNamePrice");
//             productName.classList.add("productName");
//             rateAndCart.classList.add("rateAndCart");
//             productName.textContent = `${element.title}`;
//             productDiscountPrice.classList.add("productDiscountPrice");
//             price.classList.add("price");
//             price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
//             discount.classList.add("discount");
//             discount.textContent = `${Math.round(element.price.current)} ${
//               element.price.currency
//             }`;
//             if (element.price.discountPercentage === 0) {
//               cardDiscount.style.display = "none";
//               price.style.display = "none";
//             }
//             rating.classList.add("rating");
//             rating.textContent = `★${element.rating.toFixed(1)}`;
//             addToCart.classList.add("addToCart");
//             cartIcon.className = "fa-cart-shopping fa-solid";
//             addToCart.textContent = `Add `;
//             // APPEND
//             card.appendChild(productImage);
//             card.appendChild(cardDiscount);
//             card.appendChild(forNamePrice);
//             card.appendChild(rateAndCart);
//             productImage.appendChild(cardImg);
//             forNamePrice.appendChild(productName);
//             forNamePrice.appendChild(productDiscountPrice);
//             productDiscountPrice.appendChild(discount);
//             productDiscountPrice.appendChild(price);
//             rateAndCart.appendChild(rating);
//             rateAndCart.appendChild(addToCart);
//             addToCart.appendChild(cartIcon);
//             boxOne.appendChild(card);
//           }
//         });
//       });
//   }
//   let brandsList = document.querySelector(".brandsList");
//   brandsList.addEventListener("click", (event) => {
//     if (event.target.tagName === "SPAN") {
//       let selectedBrand = event.target.textContent.toLowerCase();
//       filterByBrand(selectedBrand);
//     }
//   });
//   function filterByBrand(brandName) {
//     fetch(
//       "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         let boxOne = document.querySelector(".mainBox");
//         boxOne.innerHTML = "";
//         let filteredProducts = data.products.filter(
//           (product) => product.brand.toLowerCase() === brandName
//         );
//         filteredProducts.forEach((element) => {
//           let card = document.createElement("div");
//           let cardDiscount = document.createElement("div");
//           let productImage = document.createElement("div");
//           let cardImg = document.createElement("img");
//           let forNamePrice = document.createElement("div");
//           let productName = document.createElement("div");
//           let productDiscountPrice = document.createElement("div");
//           let price = document.createElement("div");
//           let discount = document.createElement("div");
//           let rateAndCart = document.createElement("div");
//           let rating = document.createElement("div");
//           let cartIcon = document.createElement("i");
//           let addToCart = document.createElement("div");
//           //
//           card.classList.add("card");
//           cardDiscount.classList.add("cardDiscount");
//           cardDiscount.textContent = `-${Math.round(
//             element.price.discountPercentage
//           )}%`;
//           cardImg.setAttribute("src", element.thumbnail);
//           productImage.classList.add("productImage");
//           forNamePrice.classList.add("forNamePrice");
//           productName.classList.add("productName");
//           rateAndCart.classList.add("rateAndCart");
//           productName.textContent = `${element.title}`;
//           productDiscountPrice.classList.add("productDiscountPrice");
//           price.classList.add("price");
//           price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
//           discount.classList.add("discount");
//           discount.textContent = `${Math.round(element.price.current)} ${
//             element.price.currency
//           }`;
//           if (element.price.discountPercentage === 0) {
//             cardDiscount.style.display = "none";
//             price.style.display = "none";
//           }
//           rating.classList.add("rating");
//           rating.textContent = `★${element.rating.toFixed(1)}`;
//           addToCart.classList.add("addToCart");
//           cartIcon.className = "fa-cart-shopping fa-solid";
//           addToCart.textContent = `Add `;
//           //
//           card.appendChild(productImage);
//           card.appendChild(cardDiscount);
//           card.appendChild(forNamePrice);
//           card.appendChild(rateAndCart);
//           productImage.appendChild(cardImg);
//           forNamePrice.appendChild(productName);
//           forNamePrice.appendChild(productDiscountPrice);
//           productDiscountPrice.appendChild(discount);
//           productDiscountPrice.appendChild(price);
//           rateAndCart.appendChild(rating);
//           rateAndCart.appendChild(addToCart);
//           addToCart.appendChild(cartIcon);
//           boxOne.appendChild(card);
//         });
//       });
//   }
//   let minPriceInp = document.getElementById("minPriceInp");
//   let maxPriceInp = document.getElementById("maxPriceInp");
//   let priceBtn = document.querySelector(".forPriceFilter");
//   priceBtn.addEventListener("click", filterByPrice);
//   function filterByPrice() {
//     let minPrice = parseFloat(minPriceInp.value) || 0;
//     let maxPrice = parseFloat(maxPriceInp.value) || Infinity;
//     fetch(
//       "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           console.log("Bad Connection");
//           return;
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let boxOne = document.querySelector(".mainBox");
//         boxOne.innerHTML = "";
//         data.products.forEach((element) => {
//           if (
//             element.price.current >= minPrice &&
//             element.price.current <= maxPrice
//           ) {
//             // CARD ELEMENTS
//             let card = document.createElement("div");
//             let cardDiscount = document.createElement("div");
//             let productImage = document.createElement("div");
//             let cardImg = document.createElement("img");
//             let forNamePrice = document.createElement("div");
//             let productName = document.createElement("div");
//             let productDiscountPrice = document.createElement("div");
//             let price = document.createElement("div");
//             let discount = document.createElement("div");
//             let rateAndCart = document.createElement("div");
//             let rating = document.createElement("div");
//             let cartIcon = document.createElement("i");
//             let addToCart = document.createElement("div");
//             // CLASS AND CONTENT
//             card.classList.add("card");
//             cardDiscount.classList.add("cardDiscount");
//             cardDiscount.textContent = `-${Math.round(
//               element.price.discountPercentage
//             )}%`;
//             cardImg.setAttribute("src", element.thumbnail);
//             productImage.classList.add("productImage");
//             forNamePrice.classList.add("forNamePrice");
//             productName.classList.add("productName");
//             rateAndCart.classList.add("rateAndCart");
//             productName.textContent = `${element.title}`;
//             productDiscountPrice.classList.add("productDiscountPrice");
//             price.classList.add("price");
//             price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
//             discount.classList.add("discount");
//             discount.textContent = `${Math.round(element.price.current)} ${
//               element.price.currency
//             }`;
//             if (element.price.discountPercentage === 0) {
//               cardDiscount.style.display = "none";
//               price.style.display = "none";
//             }
//             rating.classList.add("rating");
//             rating.textContent = `★${element.rating.toFixed(1)}`;
//             addToCart.classList.add("addToCart");
//             cartIcon.className = "fa-cart-shopping fa-solid";
//             addToCart.textContent = `Add `;
//             // APPEND
//             card.appendChild(productImage);
//             card.appendChild(cardDiscount);
//             card.appendChild(forNamePrice);
//             card.appendChild(rateAndCart);
//             productImage.appendChild(cardImg);
//             forNamePrice.appendChild(productName);
//             forNamePrice.appendChild(productDiscountPrice);
//             productDiscountPrice.appendChild(discount);
//             productDiscountPrice.appendChild(price);
//             rateAndCart.appendChild(rating);
//             rateAndCart.appendChild(addToCart);
//             addToCart.appendChild(cartIcon);
//             boxOne.appendChild(card);
//           }
//         });
//       });
//   }
//   let starBtn = document.querySelector(".forRatings");
//   starBtn.addEventListener("click", filterByRating);
//   function filterByRating() {
//     let starInp = document.getElementById("ratings");
//     fetch(
//       "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           console.log("Bad Connection");
//           return;
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let boxOne = document.querySelector(".mainBox");
//         boxOne.innerHTML = "";
//         data.products.forEach((element) => {
//           if (element.rating <= starInp.value) {
//             // CARD ELEMENTS
//             let card = document.createElement("div");
//             let cardDiscount = document.createElement("div");
//             let productImage = document.createElement("div");
//             let cardImg = document.createElement("img");
//             let forNamePrice = document.createElement("div");
//             let productName = document.createElement("div");
//             let productDiscountPrice = document.createElement("div");
//             let price = document.createElement("div");
//             let discount = document.createElement("div");
//             let rateAndCart = document.createElement("div");
//             let rating = document.createElement("div");
//             let cartIcon = document.createElement("i");
//             let addToCart = document.createElement("div");
//             // CLASS AND CONTENT
//             card.classList.add("card");
//             cardDiscount.classList.add("cardDiscount");
//             cardDiscount.textContent = `-${Math.round(
//               element.price.discountPercentage
//             )}%`;
//             cardImg.setAttribute("src", element.thumbnail);
//             productImage.classList.add("productImage");
//             forNamePrice.classList.add("forNamePrice");
//             productName.classList.add("productName");
//             rateAndCart.classList.add("rateAndCart");
//             productName.textContent = `${element.title}`;
//             productDiscountPrice.classList.add("productDiscountPrice");
//             price.classList.add("price");
//             price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
//             discount.classList.add("discount");
//             discount.textContent = `${Math.round(element.price.current)} ${
//               element.price.currency
//             }`;
//             if (element.price.discountPercentage === 0) {
//               cardDiscount.style.display = "none";
//               price.style.display = "none";
//             }
//             rating.classList.add("rating");
//             rating.textContent = `★${element.rating.toFixed(1)}`;
//             addToCart.classList.add("addToCart");
//             cartIcon.className = "fa-cart-shopping fa-solid";
//             addToCart.textContent = `Add `;
//             // APPEND
//             card.appendChild(productImage);
//             card.appendChild(cardDiscount);
//             card.appendChild(forNamePrice);
//             card.appendChild(rateAndCart);
//             productImage.appendChild(cardImg);
//             forNamePrice.appendChild(productName);
//             forNamePrice.appendChild(productDiscountPrice);
//             productDiscountPrice.appendChild(discount);
//             productDiscountPrice.appendChild(price);
//             rateAndCart.appendChild(rating);
//             rateAndCart.appendChild(addToCart);
//             addToCart.appendChild(cartIcon);
//             boxOne.appendChild(card);
//           }
//         });
//       });
//   }
//   let search = document.getElementById("srch");
//   function searchBar() {
//     fetch(
//       "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           console.log("Bad Connection");
//           return;
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let boxOne = document.querySelector(".mainBox");
//         boxOne.innerHTML = "";
//         data.products.forEach((element) => {
//           if (element.title.toLowerCase().includes(search.value.toLowerCase())) {
//             // CARD ELEMENTS
//             let card = document.createElement("div");
//             let cardDiscount = document.createElement("div");
//             let productImage = document.createElement("div");
//             let cardImg = document.createElement("img");
//             let forNamePrice = document.createElement("div");
//             let productName = document.createElement("div");
//             let productDiscountPrice = document.createElement("div");
//             let price = document.createElement("div");
//             let discount = document.createElement("div");
//             let rateAndCart = document.createElement("div");
//             let rating = document.createElement("div");
//             let cartIcon = document.createElement("i");
//             let addToCart = document.createElement("div");
//             // CLASS AND CONTENT
//             card.classList.add("card");
//             cardDiscount.classList.add("cardDiscount");
//             cardDiscount.textContent = `-${Math.round(
//               element.price.discountPercentage
//             )}%`;
//             cardImg.setAttribute("src", element.thumbnail);
//             productImage.classList.add("productImage");
//             forNamePrice.classList.add("forNamePrice");
//             productName.classList.add("productName");
//             rateAndCart.classList.add("rateAndCart");
//             productName.textContent = `${element.title}`;
//             productDiscountPrice.classList.add("productDiscountPrice");
//             price.classList.add("price");
//             price.textContent = `${element.price.beforeDiscount} ${element.price.currency}`;
//             discount.classList.add("discount");
//             discount.textContent = `${Math.round(element.price.current)} ${
//               element.price.currency
//             }`;
//             if (element.price.discountPercentage === 0) {
//               cardDiscount.style.display = "none";
//               price.style.display = "none";
//             }
//             rating.classList.add("rating");
//             rating.textContent = `★${element.rating.toFixed(1)}`;
//             addToCart.classList.add("addToCart");
//             cartIcon.className = "fa-cart-shopping fa-solid";
//             addToCart.textContent = `Add `;
//             // APPEND
//             card.appendChild(productImage);
//             card.appendChild(cardDiscount);
//             card.appendChild(forNamePrice);
//             card.appendChild(rateAndCart);
//             productImage.appendChild(cardImg);
//             forNamePrice.appendChild(productName);
//             forNamePrice.appendChild(productDiscountPrice);
//             productDiscountPrice.appendChild(discount);
//             productDiscountPrice.appendChild(price);
//             rateAndCart.appendChild(rating);
//             rateAndCart.appendChild(addToCart);
//             addToCart.appendChild(cartIcon);
//             boxOne.appendChild(card);
//           }
//         });
//       });
//   }
//   search.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       searchBar();
//     }
//   });