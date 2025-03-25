
fetch("https://api.everrest.educata.dev/auth")
  .then((response) => {
    if (!response.ok) {
      console.log("Bad Connection");
      return;
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
  if ((data.error = "0")) {
    let signInSuccessful = document.querySelectorAll(".signInSuccessful");
    signInSuccessful.classList.add("show");
    let checkMark = document.querySelectorAll("fa-check");
    checkMark.addEventListener("click", () => {
      register.classList.remove("show");
      signIn.classList.remove("show");
      signInSuccessful.classList.remove("show");
    });
  }
  // let userEmail = localStorage.getItem("email");
  // fetch("https://api.everrest.educata.dev/auth/verify_email", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email: userEmail }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Verification Response:", data);
  //     console.log(userEmail);
  //   });
  
// function lapTopPage() {
//   fetch(
//     "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//   )
//     .then((response) => {
//       if (!response.ok) {
//         console.log("Bad Connection");
//         return;
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("products", data);
//       let boxOne = document.querySelector(".mainBox");
//       data.products.forEach((element) => {
//         if (element.category.name === "laptops") {
//           // CARD ELEMENTS
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
//           // CLASS AND CONTENT
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
//           // APPEND
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
//         }
//       });
//     });
// }
// function mobilesPage() {
//   fetch(
//     "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38"
//   )
//     .then((response) => {
//       if (!response.ok) {
//         console.log("Bad Connection");
//         return;
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("products", data);
//       let boxOne = document.querySelector(".mainBox");
//       data.products.forEach((element) => {
//         if (element.category.name === "phones") {
//           // CARD ELEMENTS
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
//           // CLASS AND CONTENT
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
//           // APPEND
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
//         }
//       });
//     });
// }