/**
 * CogniVida - voz.js (Semana 11)
 * HU-012: Escuchar instrucciones de la actividad (Loy Abendaño)
 * Código base generado con Gemini y adaptado a la landing.
 * Las líneas marcadas con "CAMBIO" son adaptaciones para que funcione en index.html.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de elementos del DOM
    const btnEscuchar = document.getElementById('btn-escuchar');
    const textoBtnAudio = document.getElementById('texto-btn-audio');
    const btnSiguiente = document.getElementById('btn-siguiente');
    // CAMBIO: en la landing no hay "pantallas" AM-10/AM-11. Las instrucciones están
    // en los paneles .respuesta de #orientador y el ejercicio está en #ejercicio.
    const resultados = document.querySelector('#orientador .resultados');
    const seccionEjercicio = document.getElementById('ejercicio');
    const avisoVoz = document.getElementById('aviso-voz');

    // Comprobación de soporte de síntesis de voz en el navegador
    const soporteSintesisVoz = 'speechSynthesis' in window;

    // Instancia global de lectura de voz
    let mensajeVoz = null;

    if (soporteSintesisVoz) {
        mensajeVoz = new SpeechSynthesisUtterance();
        // Configuración de locución pausada y clara para adultos mayores
        mensajeVoz.rate = 0.85; // Velocidad ligeramente reducida
        mensajeVoz.pitch = 1.0; // Tono natural
        mensajeVoz.lang = 'es-ES'; // Idioma español
    } else {
        // CAMBIO (CA03): en lugar de alert(), se oculta el botón y se muestra un aviso en la página.
        if (btnEscuchar) btnEscuchar.hidden = true;
        if (avisoVoz) avisoVoz.hidden = false;
    }

    /**
     * CAMBIO: obtiene el texto a leer según el ejercicio elegido en #orientador.
     * Solo lee el título y la descripción (no el texto de los botones ni la etiqueta de nivel).
     */
    function obtenerInstrucciones() {
        const panelVisible = [...resultados.querySelectorAll('.respuesta')]
            .find(panel => getComputedStyle(panel).display !== 'none');

        if (!panelVisible) {
            return 'Primero elige un ejercicio: memoria visual, atención u orientación. Luego presiona escuchar instrucciones.';
        }
        const titulo = panelVisible.querySelector('h3').firstChild.textContent.trim();
        const descripcion = panelVisible.querySelector('p').textContent.trim();
        return 'Ejercicio de ' + titulo + '. ' + descripcion;
    }

    /**
     * Función para alternar o repetir la reproducción de audio
     */
    function reproducirInstrucciones() {
        if (!soporteSintesisVoz) return;

        // Si ya está reproduciendo, se detiene (CA03)
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            restablecerEstadoBoton();
            return;
        }

        // Asignar el texto actualizado a leer
        mensajeVoz.text = obtenerInstrucciones(); // CAMBIO

        // Evento al iniciar la reproducción: Cambiar a estado activo "Reproduciendo" (CA02)
        mensajeVoz.onstart = () => {
            if (btnEscuchar) btnEscuchar.classList.add('reproduciendo');
            if (textoBtnAudio) textoBtnAudio.textContent = 'Reproduciendo...';
        };

        // Evento al finalizar la locución: Restablecer estado del botón
        mensajeVoz.onend = () => {
            restablecerEstadoBoton();
        };

        // Evento en caso de error
        mensajeVoz.onerror = () => {
            restablecerEstadoBoton();
        };

        // Emitir la locución (se puede repetir las veces que se necesite)
        window.speechSynthesis.speak(mensajeVoz);
    }

    /**
     * Función para restablecer la apariencia del botón a su estado inicial
     */
    function restablecerEstadoBoton() {
        if (btnEscuchar) btnEscuchar.classList.remove('reproduciendo');
        if (textoBtnAudio) textoBtnAudio.textContent = 'Escuchar instrucciones';
    }

    /**
     * Función para detener el audio y navegar hacia el ejercicio cognitivo (AM-11)
     */
    function irAEjercicioCognitivo() {
        // 1. Detener cualquier audio en curso inmediatamente
        if (soporteSintesisVoz && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        restablecerEstadoBoton();

        // 2. CAMBIO: en vez de ocultar pantallas, se lleva al usuario a #ejercicio (HU-014)
        if (seccionEjercicio) {
            location.hash = '#ejercicio';
            seccionEjercicio.focus({ preventScroll: true });
        }
    }

    // 2. Asignación de escuchadores de eventos (Event Listeners)
    if (btnEscuchar) {
        btnEscuchar.addEventListener('click', reproducirInstrucciones);
    }

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', irAEjercicioCognitivo);
    }

    // CAMBIO: si el usuario cambia de ejercicio mientras escucha, se detiene el audio anterior
    document.querySelectorAll('#orientador input[name="ejercicio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (soporteSintesisVoz && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                restablecerEstadoBoton();
            }
        });
    });
});
