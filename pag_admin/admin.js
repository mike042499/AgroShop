const url = "https://xpnrrkuyw4.us-east-1.awsapprunner.com";


let animacion;
let listaProductos = JSON.parse(localStorage.getItem("KeyLista")) || [];
let contador = listaProductos?.length;

document.querySelector(".formulario").addEventListener("submit", async function (event) {
   event.preventDefault();
  const nombre = document.getElementById("nombreProducto").value;
  const desc = document.getElementById("descripcionProducto").value;
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const cantidad = parseInt(document.getElementById("cantidadProducto").value); 
  const imagenInput = document.getElementById("imageUpload");
  const imagen = imagenInput.files[0];

  if (!imagen) {
    alert("Por favor selecciona una imagen.");
    return;
  }

  try {
    // Subir imagen a Firebase Storage
    const nombreImagen = `productos/${Date.now()}_${imagen.name}`;
    const storageRef = storage.ref(nombreImagen);
    const snapshot = await storageRef.put(imagen);
    const imageUrl = await snapshot.ref.getDownloadURL();


    console.log(imageUrl);
    
    const producto = {
      nombre: nombre,
      precio: precio,
      descripcion: desc,
      cantidad: cantidad,
      imagen: imageUrl // Guardamos la URL de descarga
    };
    
    guardarProducto(producto)
    listaProductos.push(producto);
    localStorage.setItem("KeyLista", JSON.stringify(listaProductos));

    renderizarTablaProductos()
    alert("✅ Producto agregado correctamente");

    // Limpia el formulario
    document.querySelector(".formulario").reset();

    // Opcional: recarga la tabl
  } catch (error) {
    console.error("❌ Error al subir la imagen:", error);
    alert("Ocurrió un error al subir la imagen.");
  }
});



 

document.addEventListener('DOMContentLoaded', renderizarTablaProductos());



// Función para mostrar los productos en la tabla
function renderizarTablaProductos() {

  limpiarTablar();

  fetch(`${url}/productos`)
 .then(response => response.json())
 .then(data => {console.log(data)

  
    data.forEach(element => {
        crearTabla(element.id, element.nombre, element.precio, element.imagen)
    
 });
 })
.catch(error => console.error('Error:', error));


}

// Función para eliminar un producto (opcional)
function eliminarProducto(id) {
  
  if (confirm("¿Seguro que deseas eliminar este producto?")) {

     fetch(`${url}/productos/borrar/${id}`, {
        method: "DELETE",
      })
      .then(response => {
      if (response.ok) {
        alert("Producto eliminado con éxito");
        renderizarTablaProductos();
      } else {
        alert("Error al eliminar el producto");
      }
      })
  }
}



function crearTabla(id, nombre, precio, imagen){
  const tbody = document.getElementById("tabla-productos-body");
    const fila = document.createElement("tr");

    fila.innerHTML += `
      <th scope="row">${id}</th>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td><a href="${imagen}" target="_blank">Ver imagen</a></td>
      <td><button class="btn btn-outline-success" onclick="mostrarModalActualizar(${id})">Actualizar</button></td>
      <td><button class="btn btn-outline-danger" onclick="eliminarProducto(${id})">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
}

function guardarProducto(producto){

 fetch(`${url}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
      })
        .then(response => response.text()) // <- importante: leer como texto
        .then(message => {
          alert(message); // mostrará: "Pedido borrado con exito"
        })
        .catch(error => {
          console.error("Error al eliminar el pedido:", error);
        });

}

function limpiarTablar(){
   const tbody = document.getElementById("tabla-productos-body");
  tbody.innerHTML = "";
}

function mostrarModalActualizar(id){

  const modal = document.getElementById("modal-actualizar")
  modal.style.display = 'flex'


  fetch(`${url}/productos/${id}`)
  .then(response => response.json())
  .then(data => {
  document.getElementById("id-producto").textContent = `Id: ${data.id}`
  document.getElementById("nombreModal").value = data.nombre;
  document.getElementById("descripcionModal").value = data.descripcion;
  document.getElementById("precioModal").value = data.precio;
  document.getElementById("cantidadModal").value = data.cantidad; 
  document.getElementById("imageModal").textContent = data.imagen;

});

}

document.getElementById("botonModalActualizar").addEventListener('click', actualizarProducto)

async function actualizarProducto(){

  const nombre = document.getElementById("nombreModal").value;
  const desc = document.getElementById("descripcionModal").value;
  const precio = parseFloat(document.getElementById("precioModal").value);
  const cantidad = parseInt(document.getElementById("cantidadModal").value); 
  const imagenInput = document.getElementById("imageModal");
  const imagen = imagenInput.files[0];
  
  const idProducto = document.getElementById("id-producto").textContent.split("Id:").pop().trim()
  console.log(idProducto);
  

    const nombreImagen = `productos/${Date.now()}_${imagen?.name}`;
    const storageRef = storage.ref(nombreImagen);
    const snapshot = await storageRef.put(imagen);
    const imageUrl = await snapshot.ref.getDownloadURL();

   const productoActualizado = {
      nombre: nombre,
      precio: precio,
      descripcion: desc,
      cantidad: cantidad,
      imagen: imageUrl
    };

    console.log(productoActualizado);
    

  fetch(`${url}/productos/editar/${idProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productoActualizado)
      })
        .then(response => response.text()) // <- importante: leer como texto
        .then(message => {
          const modal = document.getElementById("modal-actualizar")
          modal.style.display = 'none'
          mostrarModal(message, "black")
          renderizarTablaProductos() // mostrará: "Pedido borrado con exito"
        })
        .catch(error => {
          console.error("Error al editar producto:", error);
        });

}



/*  MODAL     */


document.addEventListener("DOMContentLoaded", function() {
    animacion = lottie.loadAnimation({
    container: document.getElementById('modal-animacion'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../animaciones/registro_exitoso.json'
    });
});


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
