// ==========================================================
// CogniVida - resultado.js (Semana 11)
// HU-014: Recibir retroalimentación al finalizar un ejercicio (Paulo Arana)
// Eventos: click en «Terminar», «Continuar» y «Volver al inicio».
// Cambios en la página: crea las opciones del día, valida respuestas,
// muestra el panel de resultado, el puntaje y la barra de progreso.
// ==========================================================

// PASO 1. DOM: localizar los elementos del ejercicio
const cuestionario = document.querySelector('#cuestionario');
const opcionesDia = document.querySelector('#opciones-dia');
const preguntaDia = document.querySelector('#pregunta-dia');
const avisoEjercicio = document.querySelector('#aviso-ejercicio');
const btnTerminar = document.querySelector('#btn-terminar');

const panelResultado = document.querySelector('#resultado-ejercicio');
const textoFelicitacion = document.querySelector('#mensaje-felicitacion');
const textoAciertos = document.querySelector('#aciertos');
const textoTotal = document.querySelector('#total-preguntas');
const barraProgreso = document.querySelector('#barra-progreso');
const barraRelleno = document.querySelector('#barra-relleno');
const textoResumen = document.querySelector('#resumen-dia');
const btnContinuar = document.querySelector('#btn-continuar');
const btnVolverInicio = document.querySelector('#btn-volver-inicio');

// Contador de ejercicios terminados en esta visita (resumen del día, CA02)
let ejerciciosTerminados = 0;

// PASO 2. Crear las opciones de la pregunta 1 con el día real del dispositivo.
// Se muestran 3 días: hoy, mañana y pasado mañana, en orden mezclado.
const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const hoy = new Date().getDay();
const opciones = [hoy, (hoy + 1) % 7, (hoy + 2) % 7];
opciones.sort(function () { return Math.random() - 0.5; });

preguntaDia.dataset.correcta = dias[hoy];   // la respuesta correcta es el día de hoy
opciones.forEach(function (numeroDia, i) {
  const nombre = dias[numeroDia];
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'p1';
  input.id = 'p1-' + i;
  input.value = nombre;

  const label = document.createElement('label');
  label.htmlFor = input.id;
  label.textContent = nombre.charAt(0).toUpperCase() + nombre.slice(1);

  opcionesDia.append(input, label);
});

// PASO 3. Al presionar «Terminar»: validar y calcular el resultado
btnTerminar.addEventListener('click', function () {
  const preguntas = cuestionario.querySelectorAll('.pregunta');
  let aciertos = 0;
  let faltantes = [];

  preguntas.forEach(function (pregunta, i) {
    const elegida = pregunta.querySelector('input:checked');
    if (!elegida) {
      faltantes.push(i + 1);                       // guarda el número de la pregunta
    } else if (elegida.value === pregunta.dataset.correcta) {
      aciertos++;
    }
  });

  // Escenario adicional: si falta responder, mensaje amable sin borrar lo elegido
  if (faltantes.length > 0) {
    avisoEjercicio.textContent = 'Te falta responder la pregunta ' + faltantes.join(' y ') + '. Tómate tu tiempo.';
    avisoEjercicio.hidden = false;
    return;
  }
  avisoEjercicio.hidden = true;
  mostrarResultado(aciertos, preguntas.length);
});

// PASO 4. Mostrar el panel «¡Actividad completada!» (CA01 y CA02)
function mostrarResultado(aciertos, total) {
  ejerciciosTerminados++;

  textoAciertos.textContent = aciertos;
  textoTotal.textContent = total;

  // Mensaje de felicitación según el resultado (siempre positivo, sin castigo)
  if (aciertos === total) {
    textoFelicitacion.textContent = '¡Excelente trabajo! Respondiste todo correctamente.';
  } else if (aciertos >= total / 2) {
    textoFelicitacion.textContent = '¡Muy bien! Sigue practicando cada día.';
  } else {
    textoFelicitacion.textContent = '¡Gracias por practicar! Cada intento ayuda a tu memoria.';
  }

  // Barra de progreso: el ancho representa el porcentaje de aciertos
  const porcentaje = Math.round((aciertos / total) * 100);
  barraRelleno.style.width = porcentaje + '%';
  barraProgreso.setAttribute('aria-valuenow', aciertos);
  barraProgreso.setAttribute('aria-valuemax', total);

  textoResumen.textContent = 'Actividades terminadas hoy: ' + ejerciciosTerminados + '.';

  // Cambiar de vista: se oculta el cuestionario y se muestra el resultado
  cuestionario.hidden = true;
  panelResultado.hidden = false;
  panelResultado.focus();   // el foco va al resultado para que se anuncie
}

// PASO 5. «Continuar»: volver a empezar con las respuestas limpias (CA03)
btnContinuar.addEventListener('click', function () {
  cuestionario.querySelectorAll('input[type="radio"]').forEach(function (radio) {
    radio.checked = false;
  });
  barraRelleno.style.width = '0';
  panelResultado.hidden = true;
  cuestionario.hidden = false;
  cuestionario.querySelector('input').focus();
});

// PASO 6. «Volver al inicio»: el enlace lleva a #inicio; también se reinicia la vista
btnVolverInicio.addEventListener('click', function () {
  panelResultado.hidden = true;
  cuestionario.hidden = false;
  const inicio = document.querySelector('#inicio');
  if (inicio) inicio.focus({ preventScroll: true });
});
