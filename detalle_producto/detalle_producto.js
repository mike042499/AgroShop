//Inserción artificial de key

let productSelected = [
    // {
    //         "id": 1,
    //         "nombre": "Zanahoria",
    //         "precio": "$3200 Kg",
    //         "imagen": "../img/produc-image.png"
    //         "cantidad": 1
    //     }
];

let cantidad = 1;

//localStorage.setItem("productoSeleccionado", JSON.stringify(productSelected));

//Variables

const productNameElement = document.getElementById("product-name");
const productCostElement = document.getElementById("final-cost");
const productImgElement = document.getElementById("product-image");
const productAmountElement = document.getElementById("amount");
const productTotal = document.getElementById("purchase-resume").querySelector('h3');
const addAmountButton = document.getElementById("mayor-amount");
const subAmountButton = document.getElementById("minor-amount");

//Funciones

function leerProducto(){
    let product = JSON.parse(localStorage.getItem("productoSeleccionado") || []);
    productSelected = product;
    productSelected[0].cantidad = cantidad;

    renderizar();
}

function renderizar(){
    let nombreProducto = productSelected[0].nombre;
    let precioProducto = productSelected[0].precio;
    let imagenProducto = productSelected[0].imagen;
    let descripcionProducto = productSelected[0].descripcion;
    let cantidadProducto = productSelected[0].cantidad = cantidad;
    mostrarProducto(nombreProducto, precioProducto, imagenProducto, descripcionProducto, cantidadProducto);
}

function mostrarProducto(nombre, precio, imagen, descripcion, cantidad){
    let precioFloat = parseFloat(precio.replace("$", "").replace("Kg", "").trim());
    
    productNameElement.textContent = nombre;
    productCostElement.textContent = `$ ${precioFloat} / lb`;

    const imagenUrl = productImgElement.querySelector('img');
    imagenUrl.src = imagen;
    imagenUrl.alt = `Imagen de ${nombre}`;
    
    const descripcionP = document.getElementById("product-description");
    descripcionP.textContent = descripcion;

    productAmountElement.textContent = `${cantidad}`;
    
    productTotal.textContent = `$ ${cantidad * precioFloat}`;
}

function aumentarCantidad(){
    if (cantidad >= 1){
        cantidad += 1;
    }
    console.log(cantidad)
    productSelected[0].cantidad = cantidad;
}

function disminuirCantidad(){
    if (cantidad > 1){
        cantidad -= 1;
    }
    console.log(cantidad)
    productSelected[0].cantidad = cantidad;
}

//Eventos

addAmountButton.addEventListener('click', () => {
    aumentarCantidad();
    renderizar();
})

subAmountButton.addEventListener('click', () => {
    disminuirCantidad();
    renderizar();
})

document.addEventListener('DOMContentLoaded', () => {
    leerProducto();
})