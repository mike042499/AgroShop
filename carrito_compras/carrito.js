//Variables

let productosCarrito = [];
let subTotal = 0;
let envio = 5000;
let totalFinal = 0;
const contenedor = document.getElementById("shopping-list");
const subTotalElement = document.getElementById("sub-total");
const botonPago = document.getElementById("total-cost");
const elementoEnvio = document.getElementById("shipping-cost");

//Funciones Lista

function guardarLista(){
    localStorage.setItem("carrito", JSON.stringify(productosCarrito))
}

function mostrarItems(){
    while(contenedor.children.length > 4){ //Esto conserva los títulos
        contenedor.removeChild(contenedor.lastChild)
    }
    for (let i in productosCarrito){
        crearItem(productosCarrito[i].nombre, productosCarrito[i].precio, productosCarrito[i].imagen, productosCarrito[i].cantidad)
    }
}

function leerItems(){
    let objeto = JSON.parse(localStorage.getItem("carrito") || []);
    productosCarrito.push(...objeto)
}

function crearItem(nombre, precio, imagenRuta, cantidad){
    const productDiv = document.createElement('div');
    productDiv.classList.add("product-list");

    const productImage = document.createElement('img');
    productImage.src = imagenRuta;
    productImage.alt = `Imagen de ${nombre}`;

    const productName = document.createElement('h4');
    productName.classList.add("product-name");
    productName.innerText = nombre;

    const productCost = document.createElement('p');
    productCost.classList.add("product-cost");
    const precioNumero = parseFloat(precio.replace("$", "").replace("Kg", "").trim())
    productCost.textContent = `$ ${formatoMoneda(precioNumero)} / Kg`;

    const productCount = document.createElement('p');
    productCount.classList.add("product-count")
    productCount.textContent = cantidad;

    const productTotal = document.createElement('p');
    productTotal.classList.add("product-total");
    const finalCost = (precioNumero * cantidad);
    productTotal.textContent = `$ ${formatoMoneda(finalCost)}`;

    //Actualizacion resumen
    subTotal += finalCost;
    subTotalElement.textContent = `$ ${formatoMoneda(subTotal)}`;
    totalFinal = subTotal + envio;
    botonPago.textContent = `$ ${formatoMoneda(totalFinal)}`;
    elementoEnvio.textContent = `$ ${formatoMoneda(envio)}`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-item");
    deleteButton.textContent = "X";

    //Event Listener
    deleteButton.addEventListener('click', () => {
        contenedor.removeChild(productDiv);
        contenedor.removeChild(productCost);
        contenedor.removeChild(productCount);
        contenedor.removeChild(productTotal);
        eliminarItem(nombre);

        //Actualizacion resumen
        subTotal -= finalCost;
        subTotalElement.textContent = `$ ${formatoMoneda(subTotal)}`;
        totalFinal = subTotal + envio;
        botonPago.textContent = `$ ${formatoMoneda(totalFinal)}`;
        elementoEnvio.textContent = `$ ${formatoMoneda(envio)}`;
    })

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productTotal.appendChild(deleteButton);

    contenedor.appendChild(productDiv);
    contenedor.appendChild(productCost);
    contenedor.appendChild(productCount);
    contenedor.appendChild(productTotal);    
}

function eliminarItem(texto){
    for (let i in productosCarrito){
        if (texto == productosCarrito[i].nombre){
            productosCarrito.splice(i, 1);
        };
    };
    guardarLista();
}

//Formato Moneda
function formatoMoneda(numero){
    let valorMoneda = numero.toLocaleString('es-Co', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
    return valorMoneda
}

//Eventos

document.addEventListener('DOMContentLoaded', () => {
    leerItems();
    mostrarItems();
})

//A ventana de pago.
botonPago.addEventListener('click', () => {
    //Validacion metodo de pago
    const metodosPago = document.querySelectorAll(".form-check-input");
    let seleccion = false;

    metodosPago.forEach((metodo) => {
        if(metodo.checked){
            seleccion = true;
        }
    });

    if (!seleccion){
        alert("Debes elegir un método de pago")
    } else {
        alert(`Vas a pagar un valor de ${formatoMoneda(totalFinal)} $`)
    }
})