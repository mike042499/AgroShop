//Variables
let usuarioIngresado = JSON.parse(localStorage.getItem("ingresoUsuario"));
const contenedorHeader = document.getElementById("navbarSupportedContent").firstElementChild;
const apiUrl = "https://xpnrrkuyw4.us-east-1.awsapprunner.com";

console.log(usuarioIngresado)

//Funciones
function mostrarNombre(usuario){
    const liElement = document.createElement('li');
    liElement.classList.add("nav-item");

    const mensajeNombre = document.createElement('a');
    mensajeNombre.classList.add("nav-link"); //Opcional
    mensajeNombre.textContent = `Hola, ${usuario}!`;

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
        localStorage.removeItem("userData");
    })

    if (usuario == null || usuario == ""){
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

async function obtnerPorCorreo(correo) {
    return fetch(`${apiUrl}/usuarios/correo/${correo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(datos => {
            const usuario = {
                nombre: datos.nombre,
                direccion: datos.direccion,
                id: datos.id_Usuario
            };

            localStorage.setItem("userData", JSON.stringify(usuario));

            return usuario;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error.message);
            return null;
        });
}

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    if (usuarioIngresado) {
        const datos = JSON.parse(localStorage.getItem("userData"));
        
        if (datos) {
            mostrarNombre(datos.nombre);
        } else {
            obtnerPorCorreo(usuarioIngresado).then(usuario => {
                if (usuario) {
                    mostrarNombre(usuario.nombre);
                }
            });
        }
    }
});