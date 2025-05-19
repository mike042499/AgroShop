let listaProductos = [];


function crearCard(nombre, imagen, precio){
const contenedor = document.getElementById('contenedor-cards');
    contenedor.innerHTML += ` 
              <a href="../detalle_producto/detalle_producto.html">
                <div class="card">
                    <div class="card-image">
                        <img src="${imagen}" alt="Imagen de la card">
                        </div>
                        <div class="card-content">
                            <h2>${precio}</h2>
                            <p>${nombre}</p>
                        </div>    
                    </div>
                </a>`

}



document.addEventListener('DOMContentLoaded', function(){
    
fetch('../productos.json')
.then(response => response.json())
.then(data => {console.log(data)
    listaProductos = data.productos;
    console.log("Esta es la lista", listaProductos);
    let Lista = listaProductos;
    
    Lista.forEach(element => {
        crearCard(element.nombre, element.imagen, element.precio)
    
});
})
.catch(error => console.error('Error:', error));


let local = JSON.parse(localStorage.getItem("KeyLista"))
console.log(local);

local.forEach(element => {
    crearCard(element.nombre, "../img/arroz-removebg-preview.png", element.precio)
});

});


////Detalle producto
const contenedor = document.getElementById('contenedor-cards');

contenedor.addEventListener("click", function (event) {

    const card = event.target.closest(".card");
    if (card) {
        const detalleProducto = [{
            precio: card.querySelector(".card-content h2").textContent,
            nombre: card.querySelector(".card-content p").textContent,
            imagen: ".../"+card.querySelector(".card-image img").src.split("/AgroShop/").pop(),
        }];
        

        console.log(detalleProducto);
        localStorage.setItem("productoSeleccionado",JSON.stringify(detalleProducto));
    }
});


// fetch('../productos.json')
//     .then(response => response.json();
//     })
//     .then(data => {
//         // Si el JSON contiene un objeto con una propiedad "productos"
//         const productos = Array.isArray(data) ? data : data.productos;
//         if (!Array.isArray(productos)) {
//             throw new Error('El JSON no contiene un arreglo válido.');
//         }
//         productos.forEach(producto => {
//             console.log(`ID: ${producto.id}, Producto: ${JSON.stringify(producto)}`);
//         });
//     })
//     .catch(error => console.error('Error al cargar el archivo JSON:', error));




