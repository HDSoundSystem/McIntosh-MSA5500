/**
 * Moteur Audio McIntosh MSA5500 - Mise à jour EQ 10 Bandes
 * Gère la lecture, l'EQ graphique 10 bandes, le Loudness et les VU-mètres.
 */

if (typeof window.McIntoshAudioEngine === 'undefined' && typeof McIntoshAudioEngine === 'undefined') {

    class McIntoshAudioEngine {
        constructor(audioElement) {
            this.audio = audioElement;
            this.audioCtx = null;
            this.analyserL = null;
            this.analyserR = null;
            this.bassFilter = null;
            this.trebleFilter = null;
            this.balanceNode = null;
            this.source = null;
            
            // --- AJOUT EQ 10 BANDES ---
            this.eqBands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
            this.filters = {}; // Stocke les BiquadFilterNodes par fréquence
            
            this.bassGain = 0;
            this.trebleGain = 0;
            this.currentBalance = 0;
            this.isLoudnessActive = false;
            this.isInitialized = false;
        }

        init() {
            if (this.isInitialized) return;

            try {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                this.analyserL = this.audioCtx.createAnalyser();
                this.analyserR = this.audioCtx.createAnalyser();
                this.analyserL.fftSize = 1024;
                this.analyserR.fftSize = 1024;

                this.source = this.audioCtx.createMediaElementSource(this.audio);
                this.balanceNode = this.audioCtx.createStereoPanner();
                
                // Filtres de tonalité classiques
                this.bassFilter = this.audioCtx.createBiquadFilter();
                this.bassFilter.type = "lowshelf";
                this.bassFilter.frequency.value = 200;

                this.trebleFilter = this.audioCtx.createBiquadFilter();
                this.trebleFilter.type = "highshelf";
                this.trebleFilter.frequency.value = 3000;

                // --- CRÉATION DE LA CHAÎNE EQ 10 BANDES ---
                let lastNode = this.source;
                
                // Connexion Source -> Balance -> Bass -> Treble
                lastNode.connect(this.balanceNode);
                this.balanceNode.connect(this.bassFilter);
                this.bassFilter.connect(this.trebleFilter);
                lastNode = this.trebleFilter;

                // Création et insertion des 10 filtres Peaking
                this.eqBands.forEach(freq => {
                    const filter = this.audioCtx.createBiquadFilter();
                    filter.type = "peaking";
                    filter.frequency.value = freq;
                    filter.Q.value = 1.4; // Largeur de bande musicale
                    filter.gain.value = 0;
                    
                    this.filters[freq] = filter;
                    lastNode.connect(filter);
                    lastNode = filter;
                });

                const splitter = this.audioCtx.createChannelSplitter(2);
                lastNode.connect(splitter);
                splitter.connect(this.analyserL, 0);
                splitter.connect(this.analyserR, 1);
                
                lastNode.connect(this.audioCtx.destination);

                this.isInitialized = true;
                console.log("McIntosh Audio Engine 10-Band EQ Initialized");
            } catch (e) {
                console.error("Failed to initialize Audio Context:", e);
            }
        }

        // --- NOUVELLE MÉTHODE POUR L'EQ 10 BANDES ---
        setCustomFilter(freq, gain) {
            const filter = this.filters[freq];
            if (filter && this.audioCtx) {
                filter.gain.setTargetAtTime(gain, this.audioCtx.currentTime, 0.01);
            }
        }

        play() {
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            return this.audio.play();
        }

        pause() { this.audio.pause(); }

        stop() {
            this.audio.pause();
            this.audio.currentTime = 0;
        }

        setVolume(val) { this.audio.volume = Math.max(0, Math.min(1, val)); }

        setBalance(val) {
            this.currentBalance = Math.max(-1, Math.min(1, val));
            if (this.balanceNode && this.audioCtx) {
                this.balanceNode.pan.setTargetAtTime(this.currentBalance, this.audioCtx.currentTime, 0.01);
            }
        }

        updateEQ(bass, treble, loudnessActive) {
            this.bassGain = bass;
            this.trebleGain = treble;
            this.isLoudnessActive = loudnessActive;

            if (!this.bassFilter || !this.trebleFilter || !this.audioCtx) return;

            let finalBass = this.bassGain;
            let finalTreble = this.trebleGain;

            if (this.isLoudnessActive) {
                const intensity = Math.max(0, (0.7 - this.audio.volume) / 0.7);
                finalBass += (intensity * 8);
                finalTreble += (intensity * 4);
            }

            this.bassFilter.gain.setTargetAtTime(finalBass, this.audioCtx.currentTime, 0.01);
            this.trebleFilter.gain.setTargetAtTime(finalTreble, this.audioCtx.currentTime, 0.01);
        }

        getLevels() {
            if (!this.isInitialized) return { left: 0, right: 0 };
            const dataL = new Uint8Array(this.analyserL.frequencyBinCount);
            const dataR = new Uint8Array(this.analyserR.frequencyBinCount);
            this.analyserL.getByteFrequencyData(dataL);
            this.analyserR.getByteFrequencyData(dataR);
            const avgL = dataL.reduce((a, b) => a + b, 0) / dataL.length;
            const avgR = dataR.reduce((a, b) => a + b, 0) / dataR.length;
            return { left: avgL, right: avgR };
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = McIntoshAudioEngine;
    } else {
        window.McIntoshAudioEngine = McIntoshAudioEngine;
    }
}
