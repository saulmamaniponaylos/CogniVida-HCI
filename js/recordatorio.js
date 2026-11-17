// ==========================================================
// CogniVida - recordatorio.js (Semana 11)
// HU-005: Recibir recordatorios de mis actividades (Saúl Mamani)
// Código base generado con Gemini y adaptado por el estudiante.
// Las líneas marcadas con "CAMBIO" son modificaciones propias.
// ==========================================================

// PASO 1. DOM: localizar los elementos del banner usando sus IDs.
const banner = document.querySelector('#banner-actividad');
const btnCerrar = document.querySelector('#btn-cerrar-banner');
const btnVer = document.querySelector('#btn-ver-actividad');
// CAMBIO: secciones que recibirán el foco (ya tienen tabindex="-1" por el menú ACME).
const inicio = document.querySelector('#inicio');
const orientador = document.querySelector('#orientador');

// PASO 2. Mostrar el banner con una transición suave (CA01).
function mostrarBanner() {
  if (banner) {
    // La clase 'mostrar' activa la transición definida en el CSS.
    banner.classList.add('mostrar');
  }
}

// PASO 3. Ocultar el banner sin alterar el resto del contenido (CA03).
function ocultarBanner() {
  if (banner) {
    // Al quitar la clase, el CSS vuelve a colapsar el banner.
    banner.classList.remove('mostrar');
  }
}

// PASO 4. Escuchar los clics en los botones del banner.
if (btnCerrar) {
  // "Cerrar" oculta el aviso (CA03).
  btnCerrar.addEventListener('click', function () {
    ocultarBanner();
    // CAMBIO: el botón desaparece, así que el foco pasa al inicio y no se pierde.
    if (inicio) inicio.focus({ preventScroll: true });
  });
}

if (btnVer) {
  // "Ver actividad" lleva a #orientador (CA02). No usamos preventDefault():
  // el enlace nativo href="#orientador" hace el desplazamiento.
  btnVer.addEventListener('click', function () {
    ocultarBanner();
    // CAMBIO: igual que el menú ACME, el foco llega a la sección de destino.
    if (orientador) orientador.focus({ preventScroll: true });
  });
}

// PASO 5. Temporizador: simular que llegó la hora de la actividad.
// CAMBIO: como el script usa defer, el HTML ya está listo cuando se ejecuta;
// por eso se llama a setTimeout directamente (3000 ms = 3 segundos).
setTimeout(mostrarBanner, 3000);
