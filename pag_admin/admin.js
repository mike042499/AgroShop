
const listaProductos = JSON.parse(localStorage.getItem("KeyLista")) || [];
let contador = listaProductos?.length;

document.querySelector(".formulario").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreProducto").value;
  const desc = document.getElementById("descripcionProducto").value;
  const precio = document.getElementById("precioProducto").value;
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

    const producto = {
      id: contador++,
      nombre: nombre,
      descripcion: desc,
      precio: "$" + parseFloat(precio).toFixed(2),
      imagen: imageUrl // Guardamos la URL de descarga
    };

    listaProductos.push(producto);
    localStorage.setItem("KeyLista", JSON.stringify(listaProductos));

    alert("✅ Producto agregado correctamente");

    // Limpia el formulario
    document.querySelector(".formulario").reset();

    // Opcional: recarga la tabla
    renderizarTablaProductos();
  } catch (error) {
    console.error("❌ Error al subir la imagen:", error);
    alert("Ocurrió un error al subir la imagen.");
  }
});

// Función para mostrar los productos en la tabla
function renderizarTablaProductos() {

  limpiarTablar();

  fetch('http://localhost:8080/productos')
 .then(response => response.json())
 .then(data => {console.log(data)

  
    data.forEach(element => {
        crearTabla(element.id_producto, element.nombre, element.precio, element.imagen)
    
 });
 })
.catch(error => console.error('Error:', error));


}

// Función para eliminar un producto (opcional)
function eliminarProducto(id) {
  
  if (confirm("¿Seguro que deseas eliminar este producto?")) {

     fetch(`http://localhost:8080/productos/borrar/${id}`, {
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
  tbody.innerHTML = "";

  listaProductos.forEach((producto, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <th scope="row">${producto.id}</th>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td><a href="${producto.imagen}" target="_blank">Ver imagen</a></td>
      <td><button class="btn btn-outline-success">Actualizar</button></td>
      <td><button class="btn btn-outline-danger" onclick="eliminarProducto(${index})">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
  });
}

// Función para eliminar un producto (opcional)
function eliminarProducto(index) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    listaProductos.splice(index, 1);
    localStorage.setItem("KeyLista", JSON.stringify(listaProductos));
    renderizarTablaProductos();
  }
}

// Renderizar la tabla al cargar la página
renderizarTablaProductos();
