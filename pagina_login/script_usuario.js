//Variables
let usuarioIngresado = JSON.parse(localStorage.getItem("ingresoUsuario"));
const contenedorHeader = document.getElementById("navbarSupportedContent").firstElementChild;

//Funciones
function mostrarNombre(nombre){
    const liElement = document.createElement('li');
    liElement.classList.add("nav-item");

    const mensajeNombre = document.createElement('a');
    mensajeNombre.classList.add("nav-link"); //Opcional
    mensajeNombre.textContent = `Hola, ${nombre}!`;

    const secondliElement = document.createElement('li');
    secondliElement.classList.add("nav-item");
    const cerrarSesion = document.createElement('a');
    cerrarSesion.classList.add("nav-link");
    cerrarSesion.textContent = "Cerrar Sesión"
    cerrarSesion.href = "../pagina_login/form_inicio.html";
    const logoCS = document.createElement('img');
    logoCS.src = "../img/logout-icon.svg";
    logoCS.style.paddingLeft = "15px";

    cerrarSesion.addEventListener('click', () =>{
        localStorage.removeItem("jwt");
        localStorage.removeItem("ingresoUsuario");
    })

    if (nombre == null || nombre == ""){
        return;
    } else {
        //RemoverIniciarSesion
        contenedorHeader.removeChild(contenedorHeader.lastElementChild);
        //Agregar Nombre
        liElement.appendChild(mensajeNombre);
        contenedorHeader.appendChild(liElement);
        //Agregar cerrar sesion
        cerrarSesion.appendChild(logoCS);
        secondliElement.appendChild(cerrarSesion);
        contenedorHeader.appendChild(secondliElement);
    }
}

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    if (usuarioIngresado != null){
        mostrarNombre(usuarioIngresado);
    }
})