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
    console.log(data);
    let boxOne = document.querySelector(".mainBoxOne");
    for (let i = 0; i < 5; i++) {
      let cardArray = [];
      let randomIndex = Math.ceil(Math.random() * data.products.length);
      cardArray.push(randomIndex);
      let card = document.createElement("div");
      let productImage = document.createElement("div");
      let cardImg = document.createElement("img");
      cardImg.setAttribute("src", data.products[randomIndex].thumbnail);
      card.classList.add("card");
      productImage.classList.add("productImage");
      card.appendChild(productImage);
      productImage.appendChild(cardImg);
      boxOne.appendChild(card);
    }
  });
