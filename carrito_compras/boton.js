let contadorSpan = document.querySelector(".contador-carrito");
let contenido = JSON.parse(localStorage.getItem("carrito"));
let botonFlotante = document.querySelector(".boton-flotante").parentElement;

function leerCarrito(){
    if (!contenido || contenido.length === 0){
        contadorSpan.textContent = "0";
    } else if (contenido.length > 0){
        contadorSpan.textContent = `${contenido.length}`;
    }
}

botonFlotante.addEventListener('click', (e) => {
    if (!contenido || contenido.length === 0){
        e.preventDefault();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    leerCarrito();
})