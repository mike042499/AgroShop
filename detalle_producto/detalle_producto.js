//Inserción artificial de key

let productSelected = {};
    // {
    //         "id": 1,
    //         "nombre": "Zanahoria",
    //         "precio": "$3200 Kg",
    //         "imagen": "../img/produc-image.png"
    //         "cantidad": 1
    //     }

let cantidad = 1;
let animacion;

//localStorage.setItem("productoSeleccionado", JSON.stringify(productSelected));

//Variables

const productNameElement = document.getElementById("product-name");
const productCostElement = document.getElementById("final-cost");
const productImgElement = document.getElementById("product-image");
const productAmountElement = document.getElementById("amount");
const productTotal = document.getElementById("purchase-resume").querySelector('h3');
const addAmountButton = document.getElementById("mayor-amount");
const subAmountButton = document.getElementById("minor-amount");
const shoppingCartButton = document.getElementById("shopping-cart");

//Funciones

function leerProducto(){
    let product = JSON.parse(localStorage.getItem("productoSeleccionado") || []);
    product = product[0];
    productSelected = product;
    productSelected.cantidad = cantidad;

    renderizar();
}

function renderizar(){
    let nombreProducto = productSelected.nombre;
    let precioProducto = productSelected.precio;
    let imagenProducto = productSelected.imagen;
    let descripcionProducto = productSelected.descripcion;
    let cantidadProducto = productSelected.cantidad = cantidad;
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
    productSelected.cantidad = cantidad;
}

function disminuirCantidad(){
    if (cantidad > 1){
        cantidad -= 1;
    }
    console.log(cantidad)
    productSelected.cantidad = cantidad;
}

function agregarCarrito(){
    //Leer productos existentes, agregar producto actual y escribir en localstorage
    if (localStorage.getItem("carrito") !== null){
        let listaCarrito = JSON.parse(localStorage.getItem("carrito") || []);
        listaCarrito.push(productSelected);
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));
        mostrarModal("Producto Agregado", "black");
    } else {
        let carritoVacio = [];
        carritoVacio.push(productSelected);
        localStorage.setItem("carrito", JSON.stringify(carritoVacio));
        mostrarModal("Producto Agregado", "black");
    }
}
//Modal
function mostrarModal(mensaje, color='black', urlDestino){
    const modal = document.getElementById('modal-mensaje');
    const modalTexto = document.getElementById('modal-texto');
    modal.style.display = 'flex';
    modalTexto.textContent = mensaje;
    modalTexto.style.color = color;

    animacion.goToAndPlay(0, true);

    setTimeout(() => {
        document.getElementById('modal-mensaje').style.display = 'none';
        if (urlDestino) {
            window.location.href = urlDestino;
        }
    }, 3000);
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

shoppingCartButton.addEventListener('click', () => {
    agregarCarrito();
})

document.addEventListener('DOMContentLoaded', () => {
    //Funcionalidad
    leerProducto();

    //Modal
    animacion = lottie.loadAnimation({
    container: document.getElementById('modal-animacion'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../animaciones/producto_agregado.json'
    });
})