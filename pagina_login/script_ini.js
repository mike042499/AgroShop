const listaUsuarios = JSON.parse(localStorage.getItem("KeyUsuarios")) || [];
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener("submit", ingresoUsuario);
});

function ingresoUsuario(){
    const usuario= document.getElementById("correoUsuario").Value;
    const contraseña = document.getElementById("passwordUsuarios").Value;
    const valor=validarUsuario(usuario, contraseña);
    mostrarErrores(valor);
}

function validarUsuario(funUsiario, funContraseña){
    const valida=0;
    listaUsuarios.forEach(usuario => {
        if(usuario.nombre===funUsiario){
            valida=1;
            if(usuario.contraseña===funContraseña){
                valida=2
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
            alert("Inicio de sesión exito")
            setTimeout
            break
    }
}