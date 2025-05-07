const listaProductos = JSON.parse(localStorage.getItem("KeyLista")) || [];
let contador = listaProductos?.length;
console.log("Esta es la lista " + listaProductos);
console.log("La longitud es ",contador);



  document.querySelector(".formulario").addEventListener("submit", function(event) {
    event.preventDefault(); 


    const nombre = document.getElementById("nombreProducto").value;
    const precio = document.getElementById("precioProducto").value;
    const imagenInput = document.getElementById("imageUpload");
    const imagen = imagenInput.files[0];

 
    const producto = {
      id: contador++,
      nombre: nombre,
      precio: precio,
      imagen: imagen ? imagen.name : null
    };

  
    listaProductos.push(producto);


    console.log(JSON.stringify(listaProductos, null, 2));
    localStorage.setItem("KeyLista",JSON.stringify(listaProductos));

  });

