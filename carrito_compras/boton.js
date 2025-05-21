let contadorSpan = document.querySelector(".contador-carrito");
let contenido = JSON.parse(localStorage.getItem("carrito") || []);
let botonFlotante = document.querySelector(".boton-flotante").parentElement;

function leerCarrito(){
    if (contenido.length > 0){
        contadorSpan.textContent = `${contenido.length}`;
    } else {
        contadorSpan.textContent = "0";
    }
}

botonFlotante.addEventListener('click', (e) => {
    if (contenido.length == 0 || contenido == null ){
        e.preventDefault();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    leerCarrito();
})