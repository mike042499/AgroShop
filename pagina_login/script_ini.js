const listaUsuarios = JSON.parse(localStorage.getItem("KeyUsuarios")) || [];
let animacion;

document.addEventListener("DOMContentLoaded", function() {
    animacion = lottie.loadAnimation({
    container: document.getElementById('modal-animacion'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../animaciones/registro_exitoso.json'
    });

    document.getElementById("login").addEventListener("submit", ingresoUsuario);
});

async function ingresoUsuario(event){
    event.preventDefault();
    limpiarErrores();
    const usuario= document.getElementById("correoUsuario").value;
    const contraseña = document.getElementById("passwordUsuario").value;
    if(usuario == "agroshop@gmail.com" && contraseña == 123){
                window.location.href = "../pag_admin/admin.html";

    }




    const valor = await validarUsuario(usuario, contraseña);
    // console.log(valor);
    // mostrarErrores(valor);
}

async function validarUsuario(funUsiario, funContraseña) {
    let usuario = {
        correo: funUsiario,
        contraseña: funContraseña
    };
    let numeroError;

    fetch(`http://localhost:8080/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      })
        .then(response => {
            console.log(response.status);  // esto está bien
            if (response.ok) {
                numeroError = 2;
            }
            return response.text();  // <-- RETORNAR el contenido de la respuesta
        })
        
        .then(data => {
            localStorage.setItem("jwt", JSON.stringify(data));
            localStorage.setItem("ingresoUsuario", JSON.stringify(usuario.correo.split("@")[0]));
            console.log(numeroError);
            mostrarErrores(numeroError);
        })
        .catch(error => {
            console.error("Error al iniciar sesion:", error);
            mostrarErrores(0);
        });
    // try {
    //     const response = await fetch(`http://localhost:8080/usuarios/correo/${funUsiario}`);
    //     const data = await response.json();
        
    //     if (data.correo === funUsiario) {
    //         if (data.contraseña === funContraseña) {
    //             localStorage.setItem("ingresoUsuario", JSON.stringify(data));
    //             return 2; // Usuario y contraseña correctos
    //         }
    //         return 1; // Solo usuario correcto
    //     }

    //     return 0; // Usuario incorrecto
    // } catch (error) {
    //     console.error('Error al validar el usuario:', error);
    // }
}


function mostrarErrores(numero){
    switch(numero){
        case 0:
            document.getElementById("errorUsuario").textContent="Usuario no existente"
            document.getElementById("errorContraseña").textContent="Contraseña incorrecta"
            break
        case 1:
            document.getElementById("errorContraseña").textContent="Contraseña incorrecta"
            break
        
        case 2:
            limpiarFormulario();
            mostrarModal("Inicio de sesion exitoso", "black");
            break
    }
}

function mostrarModal(mensaje, color='black'){
    console.log("mensaje:", mensaje);
    
    const modal = document.getElementById('modal-mensaje');
    const modalTexto = document.getElementById('modal-texto');
    modal.style.display = 'flex';
    modalTexto.textContent = mensaje;
    modalTexto.style.color = color;

    animacion.goToAndPlay(0, true);

    setTimeout(() => {
        document.getElementById('modal-mensaje').style.display = 'none';
        window.location.href = "/index.html";
    }, 3000);

}

function limpiarFormulario(){
    document.getElementById("correoUsuario").value="";
    document.getElementById("passwordUsuario").value="";
}
function limpiarErrores(){
    document.getElementById("errorUsuario").textContent="";
    document.getElementById("errorContraseña").textContent="";
}