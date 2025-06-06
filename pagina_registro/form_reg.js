const listaUsuarios = JSON.parse(localStorage.getItem("KeyUsuarios")) || [];
let contador = listaUsuarios.length;

let animacion;

document.addEventListener("DOMContentLoaded", function() {

    animacion = lottie.loadAnimation({
    container: document.getElementById('modal-animacion'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../animaciones/registro_exitoso.json'
    });


    document.getElementById("registroForm").addEventListener("submit", tomar_datos);
});
function tomar_datos(event){
   // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();
    limpiarErrores();
    const nombre = document.getElementById("nombre").value;
    const email= document.getElementById("email").value;
    const celular= document.getElementById("celular").value;
    const localidad= document.getElementById("ubicacion").value;
    const direccion= document.getElementById("direccion").value;
    const contraseña=document.getElementById("password").value;
    const validacion=document.getElementById("conf_password").value;
    const aprobado=validarForm(nombre,email,celular,direccion,contraseña,validacion);
    if(aprobado){
       const usuario = {
            nombre: nombre,
            direccion: direccion,
            localidad: localidad,
            telefono: celular,
            correo: email,
            contraseña: contraseña
        };

        agregarUsuario(usuario);

        listaUsuarios.push(usuario);
    // console.log(JSON.stringify(listaProductos, null, 2));
        localStorage.setItem("KeyUsuarios",JSON.stringify(listaUsuarios));
        limpiarFormulario();
    }
}




function agregarUsuario(usuario){ 
    fetch(`http://localhost:8080/usuarios/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorMessage => {
                // Lanzamos error con el mensaje recibido desde el backend
                throw new Error(errorMessage || "Error al registrar el usuario");
            });
        }
        return response.text();
    })
    .then(message => {
        mostrarModal(message, "black");
        
    setTimeout(() => {
        window.location.href = "/pagina_login/form_inicio.html";
    }, 3000);
    })
    .catch(error => {
        console.error("Error al agregar usuario:", error.message);
        mostrarModal("Error: " + error.message, "red"); // Opcional: mostrar mensaje de error al usuario
    });
}


function validarForm(nombre,email,celular,direccion,contraseña,validacion){
    let bandera=false;
    const nombre_validar=validarNombre(nombre);
    const email_validar=validarEmail(email);
    const celular_validar=validarCelular(celular);
    // const ciudad_validar=validarCiudad(ciudad);
    const direccion_validar=validarDireccion(direccion);
    const contraseña_validar=validarContraseña(contraseña);
    const comparacion_contraseña=validarComparacion(contraseña,validacion);
    if(nombre_validar && email_validar && celular_validar && direccion_validar && contraseña_validar&&comparacion_contraseña){
        bandera=true;
    }
    return bandera;
}

function validarEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
        document.getElementById("errorCorreo").textContent="El correo no es válido";
    }
    return regex.test(email);
}
function validarCelular(celular) {
    // Expresión regular para validar el formato del número de celular
    const regex = /^\d{10}$/; // Cambia esto según el formato que necesites
    if(!regex.test(celular)){
        document.getElementById("errorTelefono").textContent="El numero no es válido";
    }
    return regex.test(celular);
}
function validarNombre(nombre){
    // Expresión regular para validar el formato del nombre
    const regex = /^[a-zA-Z\s]+$/; // Cambia esto según el formato que necesites
    if(!regex.test(nombre)){
        document.getElementById("errorNombre").textContent="El nombre no es válido";
    }
    return regex.test(nombre);
}
// function validarCiudad(ciudad){
//     // Expresión regular para validar el formato de la ciudad
//     const regex = /^[a-zA-Z\s]+$/; // Cambia esto según el formato que necesites
//     if(!regex.test(ciudad)){
//         document.getElementById("errorCiudad").textContent="La ciudad no es valida";
//     }
//     return regex.test(ciudad);
// }
function validarDireccion(direccion){
    // Expresión regular para validar el formato de la dirección
    const regex = /^[a-zA-Z0-9\s,.\-#]+$/; // Cambia esto según el formato que necesites
    if(!regex.test(direccion)){
        document.getElementById("errorDireccion").textContent="La dirección no es válida";
    }
    return regex.test(direccion);
}
function validarContraseña(contraseña){
    // Expresión regular para validar el formato de la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Cambia esto según el formato que necesites
    if(!regex.test(contraseña)){
        document.getElementById("errorPassword").textContent="La contraseña no es válida";
    }
    return regex.test(contraseña);
}

function limpiarErrores(){
    document.getElementById("errorNombre").textContent="";
    document.getElementById("errorCorreo").textContent="";
    document.getElementById("errorTelefono").textContent="";
    document.getElementById("errorCiudad").textContent="";
    document.getElementById("errorDireccion").textContent="";
    document.getElementById("errorPassword").textContent="";
    document.getElementById("errorConfPassword").textContent="";
}

function validarComparacion(contraseña,validacion){
    if(contraseña!=validacion){
        document.getElementById("errorConfPassword").textContent="Las contraseñas no coinciden";
        return false;
    }
    return true;
}

function limpiarFormulario(){
    document.getElementById("nombre").value="";
    document.getElementById("email").value="";
    document.getElementById("celular").value="";
    document.getElementById("ubicacion").value="";
    document.getElementById("direccion").value="";
    document.getElementById("password").value="";
    document.getElementById("conf_password").value="";
}

function mostrarModal(mensaje, color='black'){
    const modal = document.getElementById('modal-mensaje');
    const modalTexto = document.getElementById('modal-texto');
    modal.style.display = 'flex';
    modalTexto.textContent = mensaje;
    modalTexto.style.color = color;

    animacion.goToAndPlay(0, true);

    setTimeout(() => {
        document.getElementById('modal-mensaje').style.display = 'none';
    }, 3000);

}

document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
      const input = document.querySelector(this.getAttribute('toggle'));
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });