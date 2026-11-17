// ==========================================================
// CogniVida - medicamento.js (Semana 11)
// HU-027: Registro de la bitácora de medicamentos (Erick Ticlla)
// Eventos: click en «Confirmar toma administrada», «Confirmar» y «Cancelar»;
//          el dialog nativo también se cierra con Escape.
// Cambios en la página: abre el dialog con la hora actual, cambia el estado
// a «Administrado» (verde), deshabilita el botón y agrega la toma a la bitácora.
// ==========================================================

// PASO 1. DOM: localizar la tarjeta, el dialog y la bitácora
const tarjeta = document.querySelector('#tarjeta-medicamento');
const estado = document.querySelector('#estado-medicamento');
const botonConfirmarToma = document.querySelector('#btn-confirmar-toma');
const mensajeSincronizacion = document.querySelector('#mensaje-sincronizacion');

const dialogo = document.querySelector('#dialogo-toma');
const horaToma = document.querySelector('#hora-toma');
const botonDialogoConfirmar = document.querySelector('#btn-dialogo-confirmar');
const botonDialogoCancelar = document.querySelector('#btn-dialogo-cancelar');

const historial = document.querySelector('#historial-tomas');

// PASO 2. Obtener la hora actual del dispositivo en formato peruano (ej. 08:15 a. m.)
function horaActual() {
  return new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

// PASO 3. «Confirmar toma administrada»: abrir la ventana de confirmación (CA02)
botonConfirmarToma.addEventListener('click', function () {
  horaToma.textContent = horaActual();
  dialogo.showModal();            // showModal bloquea el resto de la página
  botonDialogoConfirmar.focus();
});

// PASO 4. «Cancelar»: cerrar sin cambiar nada (Escape hace lo mismo de forma nativa)
botonDialogoCancelar.addEventListener('click', function () {
  dialogo.close();
});

// Cuando el dialog se cierra (por cualquier motivo), el foco vuelve a la tarjeta
dialogo.addEventListener('close', function () {
  if (!botonConfirmarToma.disabled) botonConfirmarToma.focus();
});

// PASO 5. «Confirmar»: registrar la toma (CA03)
botonDialogoConfirmar.addEventListener('click', function () {
  const hora = horaToma.textContent;

  // Estado «Administrado» en verde
  estado.textContent = '✔ Administrado a las ' + hora;
  estado.classList.remove('estado-pendiente');
  estado.classList.add('estado-administrado');
  tarjeta.classList.add('confirmada');

  // El botón queda deshabilitado para evitar una dosis repetida
  botonConfirmarToma.disabled = true;
  botonConfirmarToma.textContent = 'Toma registrada';

  // Simulación de la sincronización con los demás cuidadores
  mensajeSincronizacion.textContent = 'Registro visible para todos los cuidadores vinculados.';

  // Agregar la toma a la bitácora de hoy (se crea un nuevo <li> en el DOM)
  const vacio = historial.querySelector('.vacio');
  if (vacio) vacio.remove();
  const item = document.createElement('li');
  item.textContent = 'Donepezilo 5 mg (programado 08:00 a. m.) — administrado a las ' + hora;
  historial.append(item);

  dialogo.close();
  estado.setAttribute('tabindex', '-1');
  estado.focus();                 // el foco va al nuevo estado para que se anuncie
});
