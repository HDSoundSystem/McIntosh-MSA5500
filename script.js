// --- SELECTEURS ---
const nl = document.getElementById('needle-l');
const nr = document.getElementById('needle-r');
const vfdLarge = document.querySelector('.vfd-large');
const vfdInfo = document.querySelector('.vfd-info');
const statusIcon = document.getElementById('vfd-status-icon');
const trackCount = document.getElementById('track-count');
const fileFormat = document.getElementById('file-format');
const bitrateDisplay = document.getElementById('bitrate');
const timeDisplay = document.getElementById('time-display');
const volDisplay = document.getElementById('volume-display');
const inputBtn = document.getElementById('input-knob'); 
const fileUpload = document.getElementById('audio-upload');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const stopBtn = document.getElementById('stop-btn');
const muteBtn = document.getElementById('mute-btn');
const volumeKnob = document.getElementById('volume-knob');
const pwr = document.getElementById('pwr');
const powerLed = document.querySelector('.power-led');
const audio = document.getElementById('main-audio');

// --- SELECTEURS POPUP ---
const albumOverlay = document.getElementById('album-overlay');
const albumPopup = document.getElementById('album-popup');
const popupImg = document.getElementById('popup-img');

// --- VARIABLES ---
let playlist = [];
let currentIndex = 0;
let audioCtx = null;
let analyser = null;
let dataArray = null;
let source = null;
let isPoweredOn = false;
let isMuted = false;
let isShowingRemaining = false;
let volTimeout = null;

// Variables pour avance/retour rapide
let seekInterval = null;
let isSeeking = false;
let seekStartTime = 0;
let isMouseDown = false;

let currentAngleL = -55;
let currentAngleR = -55;
let targetAngleL = -55;
let targetAngleR = -55;

// --- INITIALISATION VOLUME PAR DÉFAUT ---
let currentVolume = 0.05;
audio.volume = currentVolume;
volumeKnob.style.transform = `rotate(${currentVolume * 270 - 135}deg)`;

// Fonction pour afficher le volume ou le MUTE
function showVolumeBriefly(forceMuteDisplay = false) {
    if (!isPoweredOn || !volDisplay) return;
    clearTimeout(volTimeout);
    if (isMuted) {
        volDisplay.textContent = "MUTE";
        volDisplay.style.opacity = "1";
    } else {
        volDisplay.textContent = `VOL: ${Math.round(currentVolume * 100)}%`;
        volDisplay.style.opacity = "1";
        volTimeout = setTimeout(() => { volDisplay.style.opacity = "0"; }, 2000);
    }
}

// Fonction pour mettre à jour l'icône de statut
function updateStatusIcon(state) {
    if (!isPoweredOn || !statusIcon) return;
    statusIcon.className = "";
    if (state === 'play') {
        statusIcon.innerHTML = '<i class="fas fa-play"></i>';
    } else if (state === 'pause') {
        statusIcon.innerHTML = '<i class="fas fa-pause"></i>';
        statusIcon.classList.add('blink-soft');
    } else if (state === 'stop') {
        statusIcon.innerHTML = '<i class="fas fa-stop"></i>';
    } else {
        statusIcon.innerHTML = "";
    }
}

// --- POWER ON/OFF / REINITIALISATION ---
pwr.addEventListener('click', () => {
    isPoweredOn = !isPoweredOn;
    
    if (!isPoweredOn) {
        // --- RÉINITIALISATION COMPLÈTE ---
        audio.pause();
        audio.src = ""; 
        fileUpload.value = ""; 
        playlist = [];
        currentIndex = 0;
        isMuted = false;
        audio.muted = false;
        
        // Reset Volume par défaut (5%)
        currentVolume = 0.05;
        audio.volume = currentVolume;
        volumeKnob.style.transform = `rotate(${currentVolume * 270 - 135}deg)`;
        
        // Reset VFD
        vfdLarge.textContent = "SYSTEM OFF";
        vfdInfo.textContent = "";
        statusIcon.innerHTML = "";
        trackCount.textContent = "0/0";
        fileFormat.textContent = "---";
        bitrateDisplay.textContent = "0 KBPS";
        if(volDisplay) volDisplay.style.opacity = "0";
        if(timeDisplay) timeDisplay.textContent = "00:00";
        
        // Reset Needles
        targetAngleL = -55;
        targetAngleR = -55;

        // Fermer popup si ouvert
        if(albumOverlay) albumOverlay.style.display = 'none';
        if(albumPopup) albumPopup.style.display = 'none';
    } else {
        vfdLarge.textContent = "SELECT INPUT";
        updateStatusIcon('stop');
    }
});

// --- MOTEUR AUDIO ---
function initEngine() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.3;
        analyser.minDecibels = -85;
        analyser.maxDecibels = -15;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// --- CHARGEMENT FICHIER ---
function loadTrack(index) {
    if (playlist.length === 0 || !isPoweredOn) return;
    currentIndex = index;
    const file = playlist[currentIndex];
    trackCount.textContent = `${currentIndex + 1}/${playlist.length}`;
    fileFormat.textContent = file.name.split('.').pop().toUpperCase();
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.onloadedmetadata = () => {
        bitrateDisplay.textContent = Math.round(((file.size * 8) / audio.duration) / 1000) + " KBPS";
    };
    if (window.jsmediatags) {
        window.jsmediatags.read(file, {
            onSuccess: (tag) => {
                const t = tag.tags;
                vfdLarge.textContent = (t.title || file.name).toUpperCase().substring(0, 25);
                vfdInfo.textContent = `${t.artist || "UNKNOWN"} – ${t.album || "UNKNOWN"}`.toUpperCase();
            },
            onError: () => {
                vfdLarge.textContent = file.name.toUpperCase().substring(0, 25);
                vfdInfo.textContent = "ARTIST – ALBUM";
            }
        });
    }
    initEngine();
    audio.play().then(() => updateStatusIcon('play')).catch(e => console.warn("Interaction requise"));
}

// --- GESTION AVANCE / RETOUR RAPIDE ---
function startSeeking(direction) {
    if (!isPoweredOn || playlist.length === 0) return;
    isMouseDown = true;
    isSeeking = false;
    seekStartTime = Date.now();
    
    clearInterval(seekInterval);
    seekInterval = setInterval(() => {
        if (isMouseDown && Date.now() - seekStartTime > 500) {
            isSeeking = true;
            audio.currentTime += (direction === 'next' ? 3 : -3);
        }
    }, 100);
}

function stopSeeking(direction) {
    if (!isMouseDown) return;
    clearInterval(seekInterval);
    if (isPoweredOn && playlist.length > 0) {
        if (!isSeeking) {
            if (direction === 'next' && currentIndex < playlist.length - 1) {
                loadTrack(currentIndex + 1);
            } else if (direction === 'prev' && currentIndex > 0) {
                loadTrack(currentIndex - 1);
            }
        }
    }
    isSeeking = false;
    isMouseDown = false;
}

// --- EVENEMENTS ---
inputBtn.addEventListener('click', () => { fileUpload.click(); });

fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        if (!isPoweredOn) { isPoweredOn = true; powerLed.classList.add('active'); }
        playlist = Array.from(e.target.files);
        loadTrack(0);
    }
});

playPauseBtn.addEventListener('click', () => {
    if (!isPoweredOn || playlist.length === 0) return;
    initEngine();
    if (audio.paused) { audio.play(); updateStatusIcon('play'); } 
    else { audio.pause(); updateStatusIcon('pause'); }
});

nextBtn.addEventListener('mousedown', (e) => { if(e.button === 0) startSeeking('next'); });
nextBtn.addEventListener('mouseup', () => stopSeeking('next'));
nextBtn.addEventListener('mouseleave', () => { isMouseDown = false; clearInterval(seekInterval); });

prevBtn.addEventListener('mousedown', (e) => { if(e.button === 0) startSeeking('prev'); });
prevBtn.addEventListener('mouseup', () => stopSeeking('prev'));
prevBtn.addEventListener('mouseleave', () => { isMouseDown = false; clearInterval(seekInterval); });

stopBtn.addEventListener('click', () => {
    if (!isPoweredOn) return;
    audio.pause(); audio.currentTime = 0; updateStatusIcon('stop');
});

muteBtn.addEventListener('click', () => {
    if (!isPoweredOn) return;
    isMuted = !isMuted; audio.muted = isMuted; showVolumeBriefly(true); 
});

if (timeDisplay) {
    timeDisplay.style.cursor = "pointer";
    timeDisplay.addEventListener('click', () => { isShowingRemaining = !isShowingRemaining; });
}

audio.addEventListener('timeupdate', () => {
    if (isPoweredOn && timeDisplay && !isNaN(audio.currentTime)) {
        let displaySeconds;
        let prefix = "";
        if (isShowingRemaining && !isNaN(audio.duration)) {
            displaySeconds = Math.max(0, audio.duration - audio.currentTime);
            prefix = "-";
        } else {
            displaySeconds = audio.currentTime;
        }
        const mins = Math.floor(displaySeconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(displaySeconds % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${prefix}${mins}:${secs}`;
    }
});

// --- POPUP POCHTETTE ---
if (albumOverlay) {
    albumOverlay.addEventListener('click', () => {
        albumOverlay.style.display = 'none';
        albumPopup.style.display = 'none';
    });
}

vfdLarge.addEventListener('click', () => {
    if (!isPoweredOn || playlist.length === 0) return;
    
    const file = playlist[currentIndex];
    if (window.jsmediatags) {
        window.jsmediatags.read(file, {
            onSuccess: (tag) => {
                const image = tag.tags.picture;
                if (image) {
                    let base64String = "";
                    for (let i = 0; i < image.data.length; i++) {
                        base64String += String.fromCharCode(image.data[i]);
                    }
                    popupImg.src = `data:${image.format};base64,${window.btoa(base64String)}`;
                    albumOverlay.style.display = 'block';
                    albumPopup.style.display = 'block';
                }
            },
            onError: (error) => console.log(error)
        });
    }
});

function updateVolumeDisplay() {
    audio.volume = currentVolume;
    volumeKnob.style.transform = `rotate(${currentVolume * 270 - 135}deg)`;
    showVolumeBriefly();
}

volumeKnob.addEventListener('click', (e) => {
    if (!isPoweredOn) return;
    const rect = volumeKnob.getBoundingClientRect();
    const x = e.clientX - rect.left;
    currentVolume = (x < rect.width / 2) ? Math.max(0, currentVolume - 0.05) : Math.min(1, currentVolume + 0.05);
    updateVolumeDisplay();
});

volumeKnob.addEventListener('mouseenter', showVolumeBriefly);
volumeKnob.addEventListener('wheel', (e) => {
    if (!isPoweredOn) return;
    e.preventDefault();
    currentVolume = e.deltaY < 0 ? Math.min(1, currentVolume + 0.05) : Math.max(0, currentVolume - 0.05);
    updateVolumeDisplay();
});

audio.onended = () => {
    if (currentIndex < playlist.length - 1) loadTrack(currentIndex + 1);
    else updateStatusIcon('stop');
};

function animate() {
    requestAnimationFrame(animate);
    if (analyser && !audio.paused && isPoweredOn) {
        analyser.getByteFrequencyData(dataArray);
        let bassL = 0, midL = 0, highL = 0;
        for (let i = 0; i < 8; i++) bassL += dataArray[i];
        for (let i = 8; i < 25; i++) midL += dataArray[i];
        for (let i = 25; i < 40; i++) highL += dataArray[i];
        bassL /= 8; midL /= 17; highL /= 15;
        let levelL = (bassL * 0.5 + midL * 0.35 + highL * 0.15) * 1.8;
        let levelR = levelL * (0.92 + Math.random() * 0.16);
        let normalizedL = Math.pow(Math.min(255, levelL) / 255, 0.7);
        let normalizedR = Math.pow(Math.min(255, levelR) / 255, 0.7);
        targetAngleL = -55 + normalizedL * 95;
        targetAngleR = -55 + normalizedR * 95;
        targetAngleL = Math.max(-55, Math.min(40, targetAngleL));
        targetAngleR = Math.max(-55, Math.min(40, targetAngleR));
        let attackSpeed = 0.75, releaseSpeed = 0.25;
        currentAngleL += (targetAngleL > currentAngleL) ? (targetAngleL - currentAngleL) * attackSpeed : (targetAngleL - currentAngleL) * releaseSpeed;
        currentAngleR += (targetAngleR > currentAngleR) ? (targetAngleR - currentAngleR) * attackSpeed : (targetAngleR - currentAngleR) * releaseSpeed;
        nl.style.transform = `rotate(${currentAngleL + (Math.random() - 0.5) * 1.2}deg)`;
        nr.style.transform = `rotate(${currentAngleR + (Math.random() - 0.5) * 1.2}deg)`;
    } else {
        currentAngleL += (-55 - currentAngleL) * 0.1;
        currentAngleR += (-55 - currentAngleR) * 0.1;
        nl.style.transform = `rotate(${currentAngleL}deg)`;
        nr.style.transform = `rotate(${currentAngleR}deg)`;
    }
}
animate();


// --- GESTION DU POPUP OPTIONS ---
const optionsPopup = document.getElementById('options-popup');
const optionsToggleBtn = document.getElementById('options-toggle-btn');

if (optionsToggleBtn && optionsPopup) {
    optionsToggleBtn.addEventListener('click', (e) => {
        // Le bouton ne fonctionne que si l'appareil est allumé
        if (!isPoweredOn) return;
        
        e.stopPropagation(); // Empêche la fermeture immédiate
        const isVisible = optionsPopup.style.display === 'block';
        optionsPopup.style.display = isVisible ? 'none' : 'block';
    });
}

// Fermer la popup si on clique n'importe où ailleurs sur l'écran
document.addEventListener('click', (e) => {
    if (optionsPopup && optionsPopup.style.display === 'block') {
        if (!optionsPopup.contains(e.target) && e.target !== optionsToggleBtn) {
            optionsPopup.style.display = 'none';
        }
    }
});


// --- LOGIQUE D'OUVERTURE OPTIONS ---
const pop = document.getElementById('options-popup');
const btnOpt = document.getElementById('btn-options-trigger');

if (btnOpt && pop) {
    btnOpt.addEventListener('click', (e) => {
        // On empêche le clic de se propager pour ne pas fermer la popup aussitôt
        e.stopPropagation();
        
        // On bascule l'affichage
        if (pop.style.display === 'block') {
            pop.style.display = 'none';
        } else {
            pop.style.display = 'block';
            // On s'assure qu'elle est bien au-dessus de tout
            pop.style.zIndex = "9999"; 
        }
    });
}

// Fermer la popup si on clique à côté
document.addEventListener('click', (e) => {
    if (pop && !pop.contains(e.target)) {
        pop.style.display = 'none';
    }
});