async function loadProducts(numProducts) {
    try{
        let url = `https://fakerapi.it/api/v1/products?_quantity=${numProducts}&_taxes=12&_categories_type=uuid`;
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

