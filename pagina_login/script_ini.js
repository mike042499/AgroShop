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

function ingresoUsuario(event){
    event.preventDefault();
    limpiarErrores();
    const usuario= document.getElementById("correoUsuario").value;
    const contraseña = document.getElementById("passwordUsuario").value;
    const valor=validarUsuario(usuario, contraseña);
    console.log(valor);
    mostrarErrores(valor);
}

function validarUsuario(funUsiario, funContraseña){
    let valida=0;
    listaUsuarios.forEach(usuario => {
        if(usuario.email===funUsiario){
            valida=1;
            if(usuario.contraseña===funContraseña){
                valida=2;
                localStorage.setItem("ingresoUsuario", JSON.stringify(usuario));
                return valida
            }
        }
    });
    return valida
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