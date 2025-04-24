document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recarga

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const numero = document.getElementById('numero').value.trim(); // Número de teléfono
    const errorMsg = document.getElementById('error-msg');

    // Validación
    if (nombre === '' || email === '' || mensaje === '') {
        errorMsg.textContent = 'Por favor, completa todos los campos obligatorios.';
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
        errorMsg.textContent = 'Introduce un correo electrónico válido.';
        return;
    }

    // ✅ Si pasa validación, lo enviamos a Formspree
    fetch('https://formspree.io/f/mldbeary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            email,
            mensaje,
            numero // Incluimos el número de teléfono
        })
    })
    .then(response => {
        if (response.ok) {
            errorMsg.textContent = '¡Mensaje enviado correctamente!';
            document.getElementById('form').reset(); // Limpiar el formulario
        } else {
            errorMsg.textContent = 'Ocurrió un error al enviar el formulario.';
        }
    })
    .catch(error => {
        errorMsg.textContent = 'Error de conexión.';
    });
});
