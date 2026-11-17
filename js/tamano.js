// ==========================================================
// CogniVida - tamano.js (Semana 11)
// HU-016: Personalizar el tamaño de los elementos (Luis Cruz)
// Eventos: click en «Guardar cambios» y «Restablecer».
// Cambios en la página: atributo data-tamano en <html> (el CSS cambia
// el tamaño base de toda la página) y preferencia guardada en localStorage.
// Se carga en index.html, recursos.html y confirmacion.html.
// ==========================================================

// PASO 1. Constantes: nombre de la preferencia y niveles permitidos
const CLAVE_TAMANO = 'cognivida-tamano';
const NOMBRES = { pequeno: 'Pequeño', normal: 'Normal', grande: 'Grande' };
const raiz = document.documentElement;   // la etiqueta <html>

// PASO 2. Aplicar un tamaño a toda la página
function aplicarTamano(tamano) {
  if (tamano === 'normal') {
    raiz.removeAttribute('data-tamano');   // vuelve al tamaño definido en el CSS
  } else {
    raiz.setAttribute('data-tamano', tamano);
  }
}

// PASO 3. Leer la preferencia guardada (si el navegador bloquea localStorage, se ignora)
function leerPreferencia() {
  try {
    return localStorage.getItem(CLAVE_TAMANO);
  } catch (error) {
    return null;
  }
}

// Al cargar cualquier página se aplica el tamaño guardado (CA03)
const guardado = leerPreferencia();
if (guardado && NOMBRES[guardado]) {
  aplicarTamano(guardado);
}

// PASO 4. Controles: solo existen en index.html (sección #tamano)
const botonGuardar = document.querySelector('#btn-guardar-tamano');
const botonRestablecer = document.querySelector('#btn-restablecer-tamano');
const mensaje = document.querySelector('#mensaje-tamano');

if (botonGuardar) {
  // Marcar el radio que corresponde a la preferencia guardada
  const radioInicial = document.querySelector('#tam-' + (guardado || 'normal'));
  if (radioInicial) radioInicial.checked = true;

  // «Guardar cambios»: aplicar a toda la página y recordar la elección
  botonGuardar.addEventListener('click', function () {
    const elegido = document.querySelector('input[name="tamano"]:checked');
    const tamano = elegido.id.replace('tam-', '');   // tam-grande -> grande

    aplicarTamano(tamano);
    try {
      localStorage.setItem(CLAVE_TAMANO, tamano);
    } catch (error) { /* sin almacenamiento: se aplica solo en esta visita */ }

    mensaje.textContent = '✔ Cambios guardados: tamaño «' + NOMBRES[tamano] + '» aplicado a toda la página.';
  });

  // «Restablecer»: volver a Normal y borrar la preferencia (escenario adicional)
  botonRestablecer.addEventListener('click', function () {
    aplicarTamano('normal');
    document.querySelector('#tam-normal').checked = true;
    try {
      localStorage.removeItem(CLAVE_TAMANO);
    } catch (error) { /* nada que borrar */ }

    mensaje.textContent = 'Se restableció el tamaño «Normal».';
  });
}
