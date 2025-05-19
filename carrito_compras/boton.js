let contadorSpan = document.querySelector(".contador-carrito");
let contenido = JSON.parse(localStorage.getItem("carrito") || []);

function leerCarrito(){
    console.log(contenido.length)
    if (contenido.length > 0){
        contadorSpan.textContent = `${contenido.length}`;
    } else {
        contadorSpan.textContent = "0";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    leerCarrito();
})