// ==========================================================
// CogniVida - apoyo.js (Semana 11)
// HU-008: Solicitar apoyo a mi cuidador (Fabrizio Aguirre)
// Código base generado con Gemini. Las líneas con "CAMBIO" son adaptaciones.
// ==========================================================

// 1. Seleccionamos los elementos del DOM que vamos a manipular
const btnSolicitar = document.getElementById('btn-solicitar-apoyo');
const panelApoyo = document.getElementById('panel-apoyo');
const mensajeApoyo = document.getElementById('mensaje-apoyo');
const accionesApoyo = document.getElementById('acciones-apoyo');
const btnEnviar = document.getElementById('btn-enviar-solicitud');
const btnCancelar = document.getElementById('btn-cancelar-apoyo');
// CAMBIO: casilla para demostrar el CA03 sin desconectar el equipo
const chkSinConexion = document.getElementById('simular-sin-conexion');

// Variables de contexto según la Historia de Usuario
const cuidador = "Diego";
const actividad = "Memoria visual";

// 2. Evento para abrir el panel de confirmación (CA01)
btnSolicitar.addEventListener('click', () => {
    // Ocultamos el botón inicial y mostramos el panel
    btnSolicitar.classList.add('oculto');
    panelApoyo.classList.remove('oculto');

    // Restauramos el contenido original por si el usuario había intentado enviar antes
    restaurarPanelConfirmacion();
    // CAMBIO: el foco pasa al botón principal del panel (el botón inicial desapareció)
    btnEnviar.focus();
});

// 3. Evento para cancelar y volver al estado inicial (Escenario adicional)
btnCancelar.addEventListener('click', () => {
    panelApoyo.classList.add('oculto');
    btnSolicitar.classList.remove('oculto');
    btnSolicitar.focus(); // CAMBIO: el foco vuelve al botón inicial
});

// 4. Evento para procesar el envío de la solicitud (CA02 y CA03)
btnEnviar.addEventListener('click', () => {
    // Verificamos la conexión a internet usando la API del navegador
    // CAMBIO: también se considera "sin conexión" si la casilla de simulación está marcada
    const hayConexion = navigator.onLine && !chkSinConexion.checked;

    if (hayConexion) {
        // CA02: Conectividad exitosa
        mensajeApoyo.innerHTML = `<strong>Solicitud enviada:</strong> ${cuidador} recibirá un aviso en su celular.`;
        mensajeApoyo.classList.remove('error');                 // CAMBIO
        accionesApoyo.classList.add('oculto'); // Ocultamos los botones tras el éxito
        chkSinConexion.parentElement.classList.add('oculto');   // CAMBIO
        // CAMBIO: después de 5 s se ofrece de nuevo el botón inicial
        setTimeout(() => {
            panelApoyo.classList.add('oculto');
            btnSolicitar.classList.remove('oculto');
        }, 5000);
    } else {
        // CA03: Fallo de conectividad (se conserva el contexto: cuidador y actividad)
        mensajeApoyo.innerHTML = `<strong>No pudimos enviar tu solicitud</strong> a ${cuidador} sobre <strong>${actividad}</strong>. Por favor, revisa tu conexión.`;
        mensajeApoyo.classList.add('error');                    // CAMBIO: estilo de alerta

        // Cambiamos el texto del botón primario para reintentar
        btnEnviar.textContent = "Reintentar";
        // El contexto se conserva, el botón "Cancelar" sigue estando disponible
    }
});

// Función de apoyo para reiniciar los textos del panel
function restaurarPanelConfirmacion() {
    mensajeApoyo.innerHTML = `¿Pedir ayuda a <strong>${cuidador}</strong> con la actividad <strong>${actividad}</strong>?`;
    mensajeApoyo.classList.remove('error');                     // CAMBIO
    accionesApoyo.classList.remove('oculto');
    chkSinConexion.parentElement.classList.remove('oculto');    // CAMBIO
    btnEnviar.textContent = "Enviar solicitud";
}
