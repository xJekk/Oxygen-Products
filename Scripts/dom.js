const selectProduct = document.getElementById("number-items");
const productsContainer = document.getElementById("item-cards");
const listContainer = document.getElementById("category-list");
const storage = window.sessionStorage;
const itemCountText = document.getElementById("cart-count");
const cartButton = document.getElementById("online-cart");

window.addEventListener("load", (event) => {
    //Store cart in session storage
    if (storage.getItem("visit") == null) {
        storage.setItem("cartCount", 0);
        storage.setItem("visit", true);
        itemCountText.innerText = "(0)";
    } else {
        itemCountText.innerText = `(${storage.getItem("cartCount")})`;
    }
    loadProducts(1).then((productFromApi) => {

        addProductCard(productsContainer, productFromApi.data[0]); //Añadimos el producto

        let categoryMap = getCategoryList(productFromApi.data); //Creamos un diccionario con categoría y objetos que la cumplen
        let categories = document.createElement("div"); //Cremos el contenedor de las categorías
        categories.setAttribute("id", "categories")
        listContainer.appendChild(categories);
        addCategoryButton(categoryMap, categories); //Añadimos las categorías en forma de botón para filtrar
        let filterButtons = document.querySelectorAll(".filter-button");
        filterButtons.forEach(button => {
            button.addEventListener("click", function (event) {
                clear(productsContainer);
                let categoryName = this.innerText.split(' (')[0]; //pasamos de: category (2) a sólo el nombre para poder acceder a esa categoría en la lista de categorías
                let productList = categoryMap[categoryName]; //sacamos todos los objetos de esa categoría
                productList.forEach(product => {
                    addProductCard(productsContainer, product);
                    let buttons = document.querySelectorAll(".add-btn");  //Capturamos el botón de añadir y le asignamos el evento al clicar
                    buttons.forEach((button) => button.addEventListener('click', function (event) {
                        sumCart(productFromApi.data);
                    })); //POR QUE TENGO QUE HACER ESTO AQUÍ Y NO SIRVE UN EVENTO GENERAL AL FINAL DEL LOAD
                })
            })
        });

        let buttons = document.querySelectorAll(".add-btn");  //Capturamos el botón de añadir y le asignamos el evento al clicar
        buttons[0].addEventListener("click", function (event) {
            sumCart(productFromApi.data[0]);
        });
    });
});

selectProduct.addEventListener("change", async (event) => {
    let numProducts = selectProduct.value;
    clear(productsContainer);

    loadProducts(numProducts).then((productFromApi) => {
        productFromApi.data.forEach(product => {

            addProductCard(productsContainer, product);

        });

        let categories = document.getElementById("categories");
        let categoryMap = getCategoryList(productFromApi.data);
        // Mostramos en la web las categorias de forma dinámicas

        addCategoryButton(categoryMap, categories);

        let filterButtons = document.querySelectorAll("filter-button");
        filterButtons.forEach(button => {
            button.addEventListener("click", function (event) {
                clear(productsContainer);
                let categoryName = this.innerText.split(' (')[0]; //pasamos de: category (2) a sólo el nombre para poder acceder a esa categoría en la lista de categorías
                let productList = categoryMap[categoryName]; //sacamos todos los objetos de esa categoría
                productList.forEach(product => {
                    addProductCard(productsContainer, product);
                    let buttons = document.querySelectorAll(".add-btn");  //Capturamos el botón de añadir y le asignamos el evento al clicar
                    buttons.forEach((button) => button.addEventListener('click', function (event) {
                        sumCart(product); //POR QUE NO FUNCIONA EN GENERAL Y TENGO QUE HACER ESTO 2 VECES
                    }));
                })
            })
        });

        let buttons = document.querySelectorAll(".add-btn");  //Capturamos el botón de añadir y le asignamos el evento al clicar
        buttons.forEach((button) => button.addEventListener('click', function (event) {
            sumCart(productFromApi.data);
        }));

    });
});

cartButton.addEventListener("click", (event) => {
    alert(`Total: ${onlineCart.getTotal()} $`); //Hay que guardar esto en el session storage
});

//Funciones

function addProductCard(parent, productInfo) {
    let productCard = document.createElement('div');
    productCard.classList.add("item");
    productCard.innerHTML = `<img src=${productInfo.image} alt="${productInfo.name}"/>
                             <h2>${productInfo.name}</h2>
                             <p>${productInfo.description}</p>
                             <h3>${Math.round(productInfo.price)} $</h3>
                             <button class="add-btn">Add to cart</button>`;

    parent.appendChild(productCard);
}

function addCategoryButton(categoryMap, categoryList) {
    Object.keys(categoryMap).forEach(category => {
        let filterCategory = document.createElement("button");
        filterCategory.classList.add("filter-button");
        filterCategory.innerText = `${category} (${categoryMap[category].length})`;
        categoryList.appendChild(filterCategory);
    });
}

function clear(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

function sumCart(productData) {
    let count = Number(sessionStorage.getItem("cartCount"));
    onlineCart.addProduct(productData);
    count += 1;
    sessionStorage.setItem("cartCount", count);
    itemCountText.innerText = `(${count})`;
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