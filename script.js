// Variable para el contexto de audio
let audioCtx = null;
let latidoInterval = null;
let isLatido = false;

// Inicializa el sistema de audio del navegador
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Genera un sonido de bombo sintético con frecuencias bajas
function playKickSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    // Frecuencia inicial alta que cae rápidamente (golpe de bombo)
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.18);
    
    // Control de volumen
    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.18);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
}

// Función principal que activa y desactiva el latido
function toggleLatido() {
    initAudio();
    isLatido = !isLatido;
    
    const btnText = document.getElementById('btnText');
    const statusVal = document.getElementById('statusVal');

    if (isLatido) {
        // Activa la animación de temblor en la pantalla
        document.body.classList.add('shaking-screen');
        btnText.innerText = "¡DETENER LATIDO!";
        statusVal.innerText = "LATIENDO 🥁";

        // Lanza confeti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFC72C', '#002244', '#ffffff']
            });
        }

        // Toca el bombo rítmicamente cada 430ms
        latidoInterval = setInterval(() => {
            playKickSound();
        }, 430);

    } else {
        // Desactiva el efecto
        document.body.classList.remove('shaking-screen');
        btnText.innerText = "¡ACTIVAR LATIDO!";
        statusVal.innerText = "EN REPOSO";
        clearInterval(latidoInterval);
    }
}


