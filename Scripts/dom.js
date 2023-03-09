const selectProduct = document.getElementById("number-items");
const productsContainer = document.getElementById("item-cards");

window.addEventListener("load", (event) => {
    loadProducts(1).then((product) => {
        let productCard = document.createElement('div');
            productCard.classList.add("item");
            productCard.innerHTML = `<img src=${product.data[0].image} alt=""/>
                                          <h2>${product.data[0].name}</h2>
                                          <p>${product.data[0].description}</p>
                                          <h3>${Math.round(product.data[0].price)} $</h3>`;
            productsContainer.appendChild(productCard);
    });
  });

selectProduct.addEventListener("change",async () => {
    let numProducts = selectProduct.value;
    productsContainer.innerHTML = "";
    loadProducts(numProducts).then((productFromApi) => {
        productFromApi.data.forEach(product => {
            let productCard = document.createElement('div');
            productCard.classList.add("item");
            productCard.innerHTML = `<img src=${product.image} alt=""/>
                                     <h2>${product.name}</h2>
                                     <p>${product.description}</p>
                                     <h3>${Math.round(product.price)} $</h3>`;
            productsContainer.appendChild(productCard);
        });
    });
});




