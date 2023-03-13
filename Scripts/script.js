let onlineCart  = { //no una clase porque sólo hay 1 carrito
    products: [],
    total: 0.0,

    getTotal () {
        this.products.forEach((product) => {
            this.total = Number(product.price) + Number(this.total);
        })
        return Math.round(this.total);
    },
    addProduct(product){
        this.products.push(product);
    },
    getProductsNumber(){
        return this.products.length;
    }
}

async function loadProducts(numProducts) {
    try{
        let url = `https://fakerapi.it/api/v1/products?_quantity=${numProducts}&_taxes=12&_categories_type=string`;
        let response = await fetch(url);
        if (response.ok) {
            var responseData = await response.json();
            return responseData;
        }
        else{
            alert("Error llamando a la API");
        }
    }
    catch (e) {
        console.log(e);
    }
   
}

function getCategoryList(apiResponseData){
    // Creamos un objeto para poder tener la categoria como nombre y la relacion de la cantidad de productos que tiene esda categoria
    let categoriesPlusAmount = {};
    // Para el array que me da la api de productos. Del tipo [product1,prodct2,...] Itero para acceder a alas proiedades de productn
    apiResponseData.forEach(productInfo => {
        //Aqui estaria dentro de 1 producto, ej: product1. Que sabemos que tiene una lista de categorias
        // para poder coger cada una de las categorias, tiero sobreproductInfo.categories
        productInfo.categories.forEach(categoryName=> {
            // Comprobamos si una categoria. EJ: CategoriaX; Esta dentro del objeto categoriesPlusAmount.
            // PAra eso usamos Object.keys(objeto) que nos da un resultado de todas las categorias que existen dentro de ese objeto.
            // si no existe, agregamos una nueva con el valor 1 puesto que la hemos encontrado por primera vez
            /*
            -- Object.keys(categoriesPlusAmount) 
                Lista de categorias de los productos
            */
           
            if (! Object.keys(categoriesPlusAmount).includes(categoryName)) {
                //definimos un array para poder guardar los objetos enteros
                categoriesPlusAmount[categoryName] = [];
                categoriesPlusAmount[categoryName].push(productInfo); //Asignamos al value del key un array de productos
            }else{
                // SI la encontramos, es decir, si la categoria existe dentro del objeto, agregamos 1 unidad mas, porque hemos encontramos otro objeto mas
                //Hacemos push a la lista de productos de la categoria
                categoriesPlusAmount[categoryName].push(productInfo);
            }
        });
    });
    return categoriesPlusAmount;
}