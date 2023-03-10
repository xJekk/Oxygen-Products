const selectProduct = document.getElementById("number-items");
const productsContainer = document.getElementById("item-cards");
const listContainer = document.getElementById("category-list");
const storage = window.sessionStorage;

const itemCountText = document.getElementById("cart-count");

window.addEventListener("load", (event) => {
    if (storage.getItem("visit") == null) {
        storage.setItem("cartCount", 0);
        storage.setItem("visit", true);
        itemCountText.innerText = "(0)";
    } else {
        itemCountText.innerText = `(${storage.getItem("cartCount")})`;
    }
    loadProducts(1).then((product) => {
        let productCard = document.createElement('div');
        productCard.classList.add("item");
        productCard.innerHTML = `<img src=${product.data[0].image} alt="${product.data[0].name}"/>
                                 <h2>${product.data[0].name}</h2>
                                 <p>${product.data[0].description}</p>
                                 <h3>${Math.round(product.data[0].price)} $</h3>
                                 <button class="add-btn">Add to cart</button>`;
                                 
        productsContainer.appendChild(productCard);
        let addBtnArray = document.querySelectorAll(".add-btn");

        addBtnArray[0].addEventListener("click", () => {
            let itemCount = storage.getItem("cartCount");
            itemCount++;
            storage.setItem("cartCount", itemCount);
            itemCountText.innerText = `(${itemCount})`;
        });

        let categoryObject = getCategoryList(product.data);
        // Msotramos en la web las categorias de forma dinámicas
        let listCategory = document.createElement("ul");
        listCategory.classList.add("category-list-ul");
        listContainer.appendChild(listCategory);
        Object.keys(categoryObject).forEach(category => {
            let filterCategory = document.createElement("li");
            filterCategory.innerText = `${category} (${categoryObject[category].length})`;
            listCategory.appendChild(filterCategory);
            //Elimino evento de clicar porque sólo hay 1 elemento y las categorías que hay son de ese elemento
        });
    });
  });

selectProduct.addEventListener("change", async () => {
    let numProducts = selectProduct.value;
    let listCategory = document.querySelector(".category-list-ul");
    deleteAllChilds(productsContainer);

    loadProducts(numProducts).then((productFromApi) => {
        productFromApi.data.forEach(product => {
            let productCard = document.createElement('div');
            productCard.classList.add("item");
            productCard.innerHTML = `<img src=${product.image} alt="${product.name}"/>
                                     <h2>${product.name}</h2>
                                     <p>${product.description}</p>
                                     <h3>${Math.round(product.price)} $</h3>
                                     <button class="add-btn">Add to cart</button>`;
            productsContainer.appendChild(productCard);

            let addBtnArray = document.querySelectorAll(".add-btn");

            addBtnArray.forEach(button => {
                button.addEventListener("click", () => {
                    let itemCount = storage.getItem("cartCount");
                    itemCount++;
                    storage.setItem("cartCount", itemCount);
                    itemCountText.innerText = `(${itemCount})`;
                });
            });
            
            /*let categoryObject = getCategoryList(product.data);
            Object.keys(categoryObject).forEach(category => {
                let filterCategory = document.createElement("li");
                filterCategory.innerText = `${category} (${categoryObject[category].length})`;
                listCategory.appendChild(filterCategory);
                productLine.addEventListener("click", function () {
                    deleteAllChilds(productsContainer);
                    let productsFiltered = category.categoryName;
                    productsFiltered.forEach(productFiltered => {
                        productCard = document.createElement('div');
                        productCard.classList.add("item");
                        productCard.innerHTML = `<img src=${productFiltered.image} alt=""/>
                                                 <h2>${productFiltered.name}</h2>
                                                 <p>${productFiltered.description}</p>
                                                 <h3>${Math.round(productFiltered.price)} $</h3>`;
                        productsContainer.appendChild(productCard);
                    });
                });
            });*/
        });
    });
});

function deleteAllChilds(parentNode) {
    while(parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}


//Módulo percentage bar
const scrollBar = document.getElementById("scroll-bar");

window.addEventListener("scroll", () => {
  let percent = calcPercentage();  
  scrollBar.style.width = `${percent}%`;
});

function calcPercentage() {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let percent = Math.round(scrollPercent * 100);
    return percent;
}






