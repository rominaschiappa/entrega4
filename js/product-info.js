

const api = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("idProduct")}.json`;


async function fetchProducts() {
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error trayendo la data:", error);
    }
}

async function nuevoDisplay() {
    let products = await fetchProducts();
    let contenedor = document.querySelector(".container"); // Usar querySelector en lugar de getElementsByClassName

    products.forEach((product) => {
        contenedor.innerHTML = `
            <h1>${product.name}</h1>
        `;

       
    });
}

nuevoDisplay();



