//Variables
let usuarioIngresado = JSON.parse(localStorage.getItem("ingresoUsuario"));
console.log(usuarioIngresado);
const contenedorHeader = document.getElementById("navbarSupportedContent").firstElementChild;

//Funciones
function mostrarNombre(nombre){
    const liElement = document.createElement('li');
    liElement.classList.add("nav-item");

    const mensajeNombre = document.createElement('a');
    mensajeNombre.classList.add("nav-link"); //Opcional
    mensajeNombre.textContent = `Hola, ${nombre}!`;

    if (nombre == null || nombre == ""){
        return;
    } else {
        //RemoverIniciarSesion
        contenedorHeader.removeChild(contenedorHeader.lastElementChild);
        //Agregar Nombre
        liElement.appendChild(mensajeNombre);
        contenedorHeader.appendChild(liElement);
    }
}

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    mostrarNombre(usuarioIngresado.nombre);
})