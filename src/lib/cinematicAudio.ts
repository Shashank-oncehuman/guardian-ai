// Cinematic ambient sound system using Web Audio API
// Generates subtle synthesized sounds — no external files needed

class CinematicAudio {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private initialized = false;

  private getCtx(): AudioContext | null {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
      } catch {
        return null;
      }
    }
    return this.ctx;
  }

  enable() {
    this.enabled = true;
    if (!this.initialized) {
      this.initialized = true;
    }
  }

  disable() {
    this.enabled = false;
  }

  toggle() {
    if (this.enabled) this.disable();
    else this.enable();
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  /** Soft whoosh for page transitions */
  playTransition() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Filtered noise burst — whoosh effect
    const duration = 0.35;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);
    filter.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);
    source.stop(now + duration);
  }

  /** Deep tone for error pages */
  playError(type: "404" | "403" | "500" | "503" = "500") {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs: Record<string, number> = {
      "404": 120,
      "403": 90,
      "500": 75,
      "503": 100,
    };

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freqs[type], now);
    osc.frequency.exponentialRampToValueAtTime(freqs[type] * 0.7, now + 1.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    // Add subtle harmonic
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freqs[type] * 1.5, now);
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.03, now + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    osc.connect(gain).connect(ctx.destination);
    osc2.connect(gain2).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 2);
    osc2.start(now);
    osc2.stop(now + 1.8);
  }

  /** Subtle UI click */
  playClick() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }
}

export const cinematicAudio = new CinematicAudio();
