let api_info = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID") + EXT_TYPE}`;
let api_comments = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID") + EXT_TYPE}`;

console.log(api_info);
console.log(api_comments);

async function fetchProducts() {
    try {
        let response = await fetch(api_info);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error so it can be handled outside this function
    }
}


async function fetchComments() {
    try {
        let response = await fetch(api_comments);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error so it can be handled outside this function
    }
}






async function nuevoDisplay() {
    let products= await fetchProducts();
    let contenedor = document.getElementById("contenedor");
    let comentarios= await fetchComments();


    contenedor.innerHTML = `
    <div id="nombre"> <h1>${products.name}</h1> </div>
    <hr>
    <ul class="estilo-lista">
        <li>
            <strong>Precio</strong>
            <br>
            ${products.currency} ${products.cost}
        </li>
        <br>
        <li>
            <strong>Descripción</strong>
            <br>
            ${products.description}
        </li>
        <br>
        <li>
            <strong>Categoría</strong>
            <br>
            ${products.category}
        </li>
        <br>
        <li>
            <strong>Cantidad de vendidos</strong>
            <br>
            ${products.soldCount}
        </li>
        <br>
        </li>
        
        <li>
            <strong>Imágenes ilustrativas</strong>
            <br>
            <div class="imagenes-prod">
            <img src="${products.images[0]}">
            <img src="${products.images[1]}">
            <img src="${products.images[2]}">
            <img src="${products.images[3]}">
            </div>
        </li>
        
    </ul>
    

    
    `
comentarios.forEach(element => {
contenedor.innerHTML += ` <p class="estilo-lista">

<li>${element.user} - ${element.dateTime} - <br>${element.description} </li>  <br> 
     

</p>

    ` 



    
});
 

}



// Call nuevoDisplay to fetch and display products
nuevoDisplay();




