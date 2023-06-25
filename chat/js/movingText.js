class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#";
    this.queue = [];
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    this.queue = Array.from({ length }, (_, i) => ({
      from: oldText[i] || "",
      to: newText[i] || "",
      start: Math.floor(Math.random() * 40),
      end: Math.floor(Math.random() * 40) + Math.floor(Math.random() * 40),
    }));
    this.frame = 0;
    this.update();
  }

  update() {
    this.el.innerHTML = this.queue
      .map(({ from, to, start, end, char }, i) => {
        if (this.frame >= end) {
          return to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          return `<span class="dud">${char}</span>`;
        }
        return from;
      })
      .join("");

    if (this.queue.every(({ end }) => this.frame >= end)) {
      setTimeout(() => this.setText(this.nextPhrase()), 1400);
    } else {
      requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }

  nextPhrase() {
    const phrases = [
      "Connecting to server",
      "Relax and wait",
      "It's takes around 5-10 sec",
      "Please wait...",
      "Just a little bit left",
      "Final steps!",
      "If app does not load, read this message again",
    ];
    this.currentPhrase = (this.currentPhrase + 1) % phrases.length;
    return phrases[this.currentPhrase];
  }
}

const el = document.querySelector(".moving-text");
const fx = new TextScramble(el);
fx.currentPhrase = 0;
fx.setText(fx.nextPhrase());
