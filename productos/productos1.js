let listaProductos = [];
const url = "https://xpnrrkuyw4.us-east-1.awsapprunner.com";


function formatoMoneda(numero){
    let valorMoneda = numero.toLocaleString('es-Co', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
    return valorMoneda
}

function verDetalle(nombre){
    
window.location.href = `../detalle_producto/detalle_producto.html?nombre=${nombre}` ;

}


function limpiarCards() {
    const contenedor = document.getElementById('contenedor-cards');
    contenedor.innerHTML = '';
}


function cargarTodasCards(){
    fetch(`${url}/productos` )
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        crearCard(element.nombre, element.imagen, element.precio, element.descripcion)
    
});
}).catch(error => console.error('Error:', error));
}


function crearCard(nombre, imagen, precio, descripcion){
const contenedor = document.getElementById('contenedor-cards');
    contenedor.innerHTML += ` 
              
                <div class="card">
                    <div class="card-image">
                        <img src="${imagen}" alt="Imagen de la card">
                        </div>
                        <div class="card-content">
                            
                            <h2>$${formatoMoneda(precio)}Kg</h2>
                            <p>${nombre}</p>
                            <p class = "descripcion" style="display: none;">${descripcion}</p>
                            <button onclick="verDetalle('${nombre}')">Ver más</button>
                        </div>   
                      </a> 
                    </div>`

}

document.addEventListener('DOMContentLoaded', function(){
    
cargarTodasCards();

});



document.getElementById("buscadorFormulario").addEventListener("submit", function(event){
    event.preventDefault();

    const buscador = document.getElementById("buscador").value;
    if(buscador != ""){
        fetch(`${url}/productos/nombre/${buscador}`)
        .then(response => response.json())
        .then(data => {
            limpiarCards();
            crearCard(data.nombre, data.imagen, data.precio, data.precio);
        }).catch(error => console.error('Error:', error))
        
    }else{
        cargarTodasCards();
    }


});



////Detalle producto
// const contenedor = document.getElementById('contenedor-cards');

// contenedor.addEventListener("click", function (event) {

//     const card = event.target.closest(".card");
//     if (card) {
//         const detalleProducto = [{
//             precio: card.querySelector(".card-content h2").textContent,
//             nombre: card.querySelector(".card-content p").textContent,
//             imagen: "../img/"+card.querySelector(".card-image img").src.split("/img/").pop(),
//             descripcion: card.querySelector(".descripcion").textContent
//         }];
        

//         console.log(detalleProducto);
//         localStorage.setItem("productoSeleccionado",JSON.stringify(detalleProducto));
//     }
// });
