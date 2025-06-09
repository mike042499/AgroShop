let animacion;

document.addEventListener("DOMContentLoaded", function() {
    animacion = lottie.loadAnimation({
    container: document.getElementById('modal-animacion'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../../animaciones/notificacion_email.json'
    });
});



document.getElementById('form-recuperar').addEventListener('submit', async function (e) {
    e.preventDefault();

    const correoInput = document.getElementById('correoRecuperacion');
    const correo = correoInput.value.trim();
    const errorCorreo = document.getElementById('errorCorreo');
    const modal = document.getElementById('modal-mensaje');
    const modalTexto = document.getElementById('modal-texto');

    // Validación básica
    if (!correo || !correo.includes('@')) {
      errorCorreo.textContent = 'Ingresa un correo válido.';
      return;
    } else {
      errorCorreo.textContent = '';
    }

    try {
        const response = await fetch(`http://localhost:8080/api/recuperar?email=${encodeURIComponent(correo)}`, {
        method: 'POST'
        });

      const mensaje = await response.text();
      modalTexto.textContent = mensaje;
      modal.style.display = 'flex';
      animacion.goToAndPlay(0, true);

      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        modal.style.display = 'none';
        correoInput.value = '';
      }, 3000);
    } catch (err) {
      console.error(err);
      modalTexto.textContent = 'Ocurrió un error al enviar el correo. Inténtalo más tarde.';
      modal.style.display = 'flex';
      animacion.goToAndPlay(0, true);

      setTimeout(() => {
        modal.style.display = 'none';
      }, 3000);
    }
  });
