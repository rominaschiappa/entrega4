let api_info = `https://japceibal.github.io/emercado-api/products/${
	localStorage.getItem("prodID") + EXT_TYPE
}`;
let api_comments = `https://japceibal.github.io/emercado-api/products_comments/${
	localStorage.getItem("prodID") + EXT_TYPE
}`;

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

function crearRatingEstrellas(puntaje) {
    const maxEstrellas = 5;
    const ratingEstrellas = document.createElement("div");

    for (let i = 1; i <= maxEstrellas; i++) {
      const estrella = document.createElement("span");
      estrella.classList.add("fa", "fa-star");
      if (puntaje >= i) {
        estrella.classList.add("checked");
      }
      ratingEstrellas.appendChild(estrella);
    }

    return ratingEstrellas;
}
//Comentarios (reubicados)
function crearCardComentario(comentario) {
	let puntaje = comentario.score;
	let ratingEstrellas = crearRatingEstrellas(puntaje);
	let card = document.createElement("div");
	card.classList.add("estilo-comentarios");

	card.innerHTML = `
	<p><strong>${comentario.user}</strong> -${comentario.dateTime} -<br>
	${comentario.description}</p>
	`;

	card.appendChild(ratingEstrellas);

	return card;
}

function getContenedorDeComentarios() { 
    return document.getElementById("contenedor");
}

async function nuevoDisplay() {let products = await fetchProducts();
    let contenedor = getContenedorDeComentarios();
	let comentarios = await fetchComments();
    //Caracteristicas Productos
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
        <br>
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${products.images[0]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${products.images[1]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${products.images[2]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${products.images[3]}" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
            </button>
        </div>
    </li>
    
    </ul>
    

    <h2>Comentarios</h2> `;
	// comentarios
	comentarios.forEach((comentario) => {
        const card = crearCardComentario(comentario);
        
        contenedor.appendChild(card);
	});
}

let boton = document.getElementById("btnEnviar");

boton.addEventListener("click", function () {
    const fecha = new Date();
    const now = fecha.toLocaleString();

    const  comentarioNuevo = {
        user: localStorage.getItem("email"),
        description: document.getElementById("areaDeTexto").value,
        score: document.getElementById("estrellas-enviadas").value,
        dateTime: now
    };
    const cardComentario = crearCardComentario(comentarioNuevo);

    const contenedor = getContenedorDeComentarios();
    contenedor.appendChild(cardComentario)
});

 // Call nuevoDisplay to fetch and display products
 nuevoDisplay();


// funcion que guarda el id
 function prodID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

 

// Función para mostrar productos en la página
async function mostrarProductosrelacionados() {
    let products = await fetchProducts()
    const productosContainer = document.getElementById("productos-container");

    products.relatedProducts.forEach(element=>{
        productosContainer.innerHTML+=
        `
        
        
        <ul class="producto"class="productoReferencia" onclick="prodID(${element.id})">
            <li>
            <div id="nombre"> <img src="${element.image}"></img> </div>
                <br>
                <div id="nombre"> <h1>${element.name}</h1> </div>
            </li>

            
            </ul>             
            
            `


    })

   

}

// Llamar a la función para mostrar productos cuando la página cargue
window.onload = mostrarProductosrelacionados;





