document.addEventListener("DOMContentLoaded", () => {
  let pageLoad = document.body.getAttribute("data-page");
  if (pageLoad === "main") {
    mainPage();
  }
});
let logInBox = document.querySelector(".logInBox");
let signIn = document.querySelector(".signIn");
let register = document.querySelector(".register");
let registerBtn = document.querySelector(".registerBtn");
let goBack = document.querySelector(".goBack");
let xMark = document.querySelectorAll(".fa-xmark");
let signInSuccessful = document.querySelector(".signInSuccessful");
let checkMark = document.querySelector(".fa-check");
let logOutBox = document.querySelector(".logOutBox");
let avatarImg = document.querySelector(".avatarImg");
let blurBG = document.querySelector(".blurBG");
let allBtn = document.querySelector(".allProductsBtn");
let burgerBtn = document.querySelector(".fa-bars");
let burgerContent = document.querySelector(".burgerContent");
burgerBtn.addEventListener("click", () => {
  burgerContent.classList.toggle("show");
});
allBtn.addEventListener("click", mainPage);
blurBG.addEventListener("click", () => {
  signIn.classList.remove("show");
  register.classList.remove("show");
  blurBG.classList.remove("show");
  signInSuccessful.remove("show");
  location.reload();
});
logInBox.addEventListener("click", () => {
  signIn.classList.toggle("show");
  blurBG.classList.add("show");
  if (register.classList.contains("show")) {
    register.classList.remove("show");
  }
});
registerBtn.addEventListener("click", () => {
  signIn.classList.remove("show");
  register.classList.toggle("show");
});
xMark.forEach((x) => {
  x.addEventListener("click", () => {
    signIn.classList.remove("show");
    register.classList.remove("show");
    blurBG.classList.remove("show");
  });
});
goBack.addEventListener("click", () => {
  register.classList.remove("show");
  signIn.classList.add("show");
});
// Category DropDowns
let categotyDropDown = document.querySelector(".categotyDropDown");
let caretDown = document.querySelector(".fa-caret-down");
let categoryList = document.querySelector(".categoryList");
categotyDropDown.addEventListener("click", () => {
  categoryList.classList.toggle("show");
  caretDown.classList.toggle("yTranslate");
});
fetch("https://api.everrest.educata.dev/shop/products/brands")
  .then((response) => response.json())
  .then((data) => {
    let brandsList = document.querySelector(".brandsList");
    data.sort((a, b) => a.localeCompare(b));
    data.forEach((element) => {
      let brandNames = document.createElement("span");
      let formattedBrand =
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      brandsList.appendChild(brandNames);
      brandNames.textContent = formattedBrand;
    });
  });
let filterLpatopBtn = document.querySelector(".filterLpatopBtn");
filterLpatopBtn.addEventListener("click", lapTopFilter);
let filterMobileBtn = document.querySelector(".filterMobileBtn");
filterMobileBtn.addEventListener("click", mobilesFilter);
let brands = document.querySelector(".brands");
let caretDown2 = document.getElementById("caretDown2");
brands.addEventListener("click", () => {
  let brandsList = document.querySelector(".brandsList");
  brandsList.classList.toggle("show");
  caretDown2.classList.toggle("yTranslate");
});
let forSignIn = {
  email: "",
  password: "",
};
let forSignUp = {
  firstName: "string",
  lastName: "string",
  age: 0,
  email: "string",
  password: "string",
  address: "string",
  phone: "string",
  zipcode: "string",
  avatar: "https://imgur.com/9dAgDu2",
  gender: "string",
};
let logInBtn = document.querySelector(".logInBtn");
logInBtn.addEventListener("click", () => logIn());
document.querySelector("#logIn").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    logIn();
  }
});

document.querySelector("#logInPwd").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    logIn();
  }
});
function logIn() {
  forSignIn.email = document.querySelector("#logIn").value;
  forSignIn.password = document.querySelector("#logInPwd").value;
  fetch("https://api.everrest.educata.dev/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forSignIn),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.access_token != null) {
        localStorage.setItem("AuthToken", data.access_token);
        localStorage.setItem("email", email);
        localStorage.setItem("isLogged", true);
        for (let key in forSignIn) {
          localStorage.setItem(key, forSignIn[key]);
        }
      }
      fetch("https://api.everrest.educata.dev/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      })
        .then((resoponse) => resoponse.json())
        .then((data) => {
          if (localStorage.getItem("isLogged") === "true") {
            signIn.classList.remove("show");
            signInSuccessful.classList.add("show");
            checkMark.addEventListener("click", () => {
              signInSuccessful.classList.remove("show");
              location.reload();
            });
          } else {
            let closeMark = document.querySelector(".noSuccessXmark");
            let noSuccess = document.querySelector(".noSuccess");
            noSuccess.classList.add("show");
            signIn.classList.remove("show");
            closeMark.addEventListener("click", () => {
              noSuccess.classList.remove("show");
              location.reload();
            });
          }
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
  let isLoggedIn = localStorage.getItem("isLogged");
  if (isLoggedIn === "true") {
    logOutBox.classList.add("show");
    logInBox.style.display = "none";
    logOutBox.addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });
  }
});
let regBtn = document.querySelector(".forReg");
regBtn.addEventListener("click", () => {
  forSignUp.firstName = document.querySelector("#firstName").value;
  forSignUp.lastName = document.querySelector("#lastName").value;
  forSignUp.age = document.querySelector("#age").value;
  forSignUp.email = document.querySelector("#email").value;
  forSignUp.password = document.querySelector("#password").value;
  forSignUp.address = document.querySelector("#address").value;
  forSignUp.phone = document.querySelector("#phone").value;
  forSignUp.zipcode = document.querySelector("#zipcode").value;
  // forSignUp.avatar = document.querySelector("#avatar").value;
  forSignUp.gender = document.querySelector("input:checked").value;
  fetch("https://api.everrest.educata.dev/auth/sign_up", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(forSignUp),
  })
    .then((resoponse) => resoponse.json())
    .then((data) => {
      console.log(data);
    });
});
function mainPage() {
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
      console.log("API-დან მიღებული პროდუქტი", data);
      let boxOne = document.querySelector(".mainBox");
      boxOne.innerHTML = "";
      data.products.forEach((element) => {
        createCardForItems(element, boxOne);
      });
    });
}
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
    let productId = element._id;
    fetch(`https://api.everrest.educata.dev/shop/products/id/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `product.html?id=${data._id}`;
      });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  let params = new URLSearchParams(window.location.search);
  let productId = params.get("id");
  if (productId) {
    fetch(`https://api.everrest.educata.dev/shop/products/id/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let productBox = document.querySelector(".productBox");
        let image = document.createElement("img");
        image.setAttribute("src", data.images[1]);
        productBox.appendChild(image);
      });
  }
});
