// ===============================================
// 🔑 SECRET PASSWORDS FOR EACH DAY
// Change these to your own secret words or dates!
// ===============================================
const DAY_PASSWORDS = {
  may30:  "thespark",   // Chapter 1: May 30th
  may31:  "ourvow",     // Chapter 2: May 31st
  aug1:   "mywife",     // Chapter 3: August 1st
  aug2:   "forever",    // Chapter 4: August 2nd
  vault:  "memories",   // Chapter 5: The Memory Vault
  prose:  "always",     // Chapter 6: The Eternal Prose
  finale: "eternity"    // Chapter 7: Our Future Constellation
};

// Function to check password and unlock the chapter
function unlockChapter(dayKey, targetSectionId) {
  const userPassword = prompt(`🔑 Enter the secret password to unlock this chapter:`);

  // If user cancels the prompt
  if (userPassword === null) return;

  // Check if password matches (case-insensitive)
  if (
    DAY_PASSWORDS[dayKey] &&
    userPassword.trim().toLowerCase() === DAY_PASSWORDS[dayKey].toLowerCase()
  ) {
    const section = document.getElementById(targetSectionId);
    if (section) {
      section.removeAttribute("hidden");
      section.scrollIntoView({ behavior: "smooth" });
      alert("✨ Correct! Chapter Unlocked, My Love ❤️");
    }
  } else {
    alert("❌ Wrong password, my love!! if you need passwords ask me ill tell you but you need to do few tasks muwhahahaahha❤️");
  }
}

/* ==========================================================================
   Old Love & Heavenly Romance — script.js
   ========================================================================== */
(() => {
  "use strict";
  var stars = [], sctx = null, scv = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ====== CONFIG — edit these ====== */
  const CONFIG = {
    audioSrc: "",                        // paste a direct .mp3 URL here
    lovingSince: "2026-05-30T03:23:57",  // start of the live counter
  };

  /* ---------------------------------------------------------------
     1. THRESHOLD — wax seal
  --------------------------------------------------------------- */
  const threshold = $("#threshold");
  const envelope = $("#envelope");
  const story = $("#story");
  const gramophone = $("#gramophone");

  function openLetter() {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    $("#threshold-hint").style.opacity = 0;
    burstPetals(window.innerWidth / 2, window.innerHeight / 2, 90);
    goldDust(window.innerWidth / 2, window.innerHeight / 2, 60);
    setTimeout(() => {
      story.hidden = false;
      gramophone.hidden = false;
      document.body.classList.remove("locked");
      threshold.classList.add("gone");
      initAfterOpen();
      setTimeout(() => threshold.remove(), 1600);
    }, 1500);
  }
  $("#wax-seal").addEventListener("click", openLetter);

  /* ---------------------------------------------------------------
     2. PETALS (background canvas)
  --------------------------------------------------------------- */
  const pc = $("#petal-canvas");
  const pctx = pc.getContext("2d");
  let petals = [];

  function sizeCanvas(c) {
    const d = Math.min(devicePixelRatio || 1, 2);
    c.width = innerWidth * d;
    c.height = innerHeight * d;
    c.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
  }
  function makePetal(x, y, burst) {
    return {
      x: x ?? rand(0, innerWidth),
      y: y ?? rand(-innerHeight, 0),
      s: rand(6, 14),
      vy: burst ? rand(-3, 3) : rand(.4, 1.4),
      vx: burst ? rand(-4, 4) : rand(-.5, .5),
      rot: rand(0, Math.PI * 2),
      vr: rand(-.02, .02),
      a: rand(.35, .85),
      hue: Math.random() < .35 ? "#D4AF37" : Math.random() < .5 ? "#7A1C2E" : "#C42A38",
      life: burst ? 240 : Infinity,
    };
  }
  function burstPetals(x, y, n) { for (let i = 0; i < n; i++) petals.push(makePetal(x, y, true)); }

  function drawPetals() {
    pctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.x += p.vx + Math.sin((p.y + p.rot * 40) / 90) * .5;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.life !== Infinity) { p.life--; p.vy += .02; p.a *= .995; }
      if (p.y > innerHeight + 40 || p.life <= 0 || p.a < .03) {
        if (p.life === Infinity) { petals[i] = makePetal(); } else { petals.splice(i, 1); }
        continue;
      }
      pctx.save();
      pctx.translate(p.x, p.y);
      pctx.rotate(p.rot);
      pctx.globalAlpha = p.a;
      pctx.fillStyle = p.hue;
      pctx.beginPath();
      pctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, Math.PI * 2);
      pctx.fill();
      pctx.restore();
    }
  }

  /* ---------------------------------------------------------------
     3. GOLDEN DUST on pointer
  --------------------------------------------------------------- */
  const dc = $("#dust-canvas");
  const dctx = dc.getContext("2d");
  let dust = [];
  function goldDust(x, y, n = 6) {
    for (let i = 0; i < n; i++) {
      dust.push({
        x, y, vx: rand(-1.4, 1.4), vy: rand(-1.8, .6), r: rand(1, 3.2), a: 1,
        c: Math.random() < .55 ? "212,175,55" : "196,42,56",
      });
    }
    if (dust.length > 700) dust.splice(0, dust.length - 700);
  }
  function drawDust() {
    dctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = dust.length - 1; i >= 0; i--) {
      const d = dust[i];
      d.x += d.vx; d.y += d.vy; d.vy += .02; d.a -= .016;
      if (d.a <= 0) { dust.splice(i, 1); continue; }
      dctx.globalAlpha = d.a;
      dctx.fillStyle = `rgb(${d.c})`;
      dctx.shadowBlur = 10;
      dctx.shadowColor = `rgba(${d.c},.9)`;
      dctx.beginPath();
      dctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      dctx.fill();
    }
    dctx.globalAlpha = 1; dctx.shadowBlur = 0;
  }
  let lastDust = 0;
  const dustFromEvent = (e) => {
    const now = performance.now();
    if (now - lastDust < 28) return;
    lastDust = now;
    const p = e.touches ? e.touches[0] : e;
    goldDust(p.clientX, p.clientY, 4);
  };
  addEventListener("pointermove", dustFromEvent, { passive: true });
  addEventListener("pointerdown", (e) => goldDust(e.clientX, e.clientY, 22), { passive: true });

  /* ---------------------------------------------------------------
     4. RENDER LOOP
  --------------------------------------------------------------- */
  function resizeAll() {
    sizeCanvas(pc); sizeCanvas(dc);
    const s = $("#stars"); if (s) sizeStars();
  }
  addEventListener("resize", resizeAll);
  resizeAll();
  for (let i = 0; i < (innerWidth < 700 ? 22 : 40); i++) petals.push(makePetal());

  function loop() {
    if (!reduced) { drawPetals(); drawDust(); drawStars(); }
    requestAnimationFrame(loop);
  }
  loop();

  /* ---------------------------------------------------------------
     5. RED STRING OF FATE
  --------------------------------------------------------------- */
  const fatePath = $("#fate-path");
  function buildString() {
    const H = 1000, pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      pts.push([50 + Math.sin(t * Math.PI * 7) * 34 + Math.sin(t * Math.PI * 2.3) * 10, t * H]);
    }
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x, y] = pts[i], [px, py] = pts[i - 1];
      d += ` Q${px},${(py + y) / 2} ${x},${y}`;
    }
    fatePath.setAttribute("d", d);
    const len = fatePath.getTotalLength();
    fatePath.style.strokeDasharray = len;
    fatePath.style.strokeDashoffset = len;
    return len;
  }
  let fateLen = buildString();
  addEventListener("resize", () => { fateLen = buildString(); onScroll(); });

  /* ---------------------------------------------------------------
     6. SCROLL: string unspool, filigree, parallax
  --------------------------------------------------------------- */
  const filigrees = $$(".filigree");
  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    fatePath.style.strokeDashoffset = fateLen * (1 - Math.min(1, p * 1.05));
    fatePath.style.strokeWidth = (0.5 + Math.sin(performance.now() / 600) * 0.08).toFixed(3);
    fatePath.style.opacity = 0.65 + 0.35 * Math.abs(Math.sin(performance.now() / 900));
    filigrees.forEach((f) => {
      const s = f.closest("section").getBoundingClientRect();
      const local = Math.min(1, Math.max(0, (innerHeight - s.top) / (s.height + innerHeight)));
      f.style.height = (local * 100) + "%";
    });
  }
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });

  /* ---------------------------------------------------------------
     7. REVEAL OBSERVER
  --------------------------------------------------------------- */
  function observeReveals() {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
    $$("[data-reveal], .manuscript .line").forEach((el) => io.observe(el));

    // pen-writing paragraphs, staggered per diary
    $$(".diary").forEach((d) => {
      const dio = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          $$(".pen", e.target).forEach((p, i) => setTimeout(() => p.classList.add("in"), i * 550));
          dio.unobserve(e.target);
        });
      }, { threshold: .18 });
      dio.observe(d);
    });
  }

  /* ---------------------------------------------------------------
     8. MAGNETIC BUTTONS
  --------------------------------------------------------------- */
  function magnetise() {
    $$(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = `translate(${dx * 14}px, ${dy * 12}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------------
     9. MODAL
  --------------------------------------------------------------- */
  const modal = $("#modal");
  function openModal(title, html) {
    $("#modal-title").textContent = title;
    $("#modal-body").innerHTML = html;
    modal.hidden = false;
  }
  const closeModal = () => { modal.hidden = true; };
  $("#modal-x").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  const VOWS = `
    <p>I vow to be the calm in your storms and the applause in your triumphs.</p>
    <p>I vow to love you loudly on the good days and quietly, stubbornly, on the hard ones.</p>
    <p>I vow that no argument will ever outlive a night, no distance will ever outlive a thread, and no version of you will ever be one I stop choosing.</p>
    <p>I vow forever — and then, if forever runs out, whatever comes after it.</p>`;

  /* ---------------------------------------------------------------
    10. AUDIO — gramophone
  --------------------------------------------------------------- */
  function initAudio() {
    const audio = $("#audio");
    const vinyl = $("#vinyl");
    if (CONFIG.audioSrc) audio.src = CONFIG.audioSrc;
    let notesTimer = null;
    vinyl.addEventListener("click", async () => {
      if (!audio.src) {
        openModal("Our song", "<p>Add a direct MP3 link at the top of <b>script.js</b> (<code>CONFIG.audioSrc</code>) and this gramophone will play it on a loop.</p>");
        return;
      }
      try {
        if (audio.paused) { await audio.play(); gramophone.classList.add("playing"); notesTimer = setInterval(floatNote, 900); }
        else { audio.pause(); gramophone.classList.remove("playing"); clearInterval(notesTimer); }
      } catch { /* autoplay blocked */ }
    });
    function floatNote() {
      const n = document.createElement("span");
      n.className = "music-note";
      n.textContent = ["♪", "♫", "♩"][Math.floor(Math.random() * 3)];
      const r = gramophone.getBoundingClientRect();
      n.style.left = (r.left + rand(0, r.width)) + "px";
      n.style.top = r.top + "px";
      n.style.setProperty("--dx", rand(-40, 40) + "px");
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 2600);
    }
  }

  /* ---------------------------------------------------------------
    11. SECTION 3 & 4 interactions
  --------------------------------------------------------------- */
  function initChapters() {
    $$("[data-modal]").forEach((b) =>
      b.addEventListener("click", () => { goldDust(innerWidth / 2, innerHeight / 2, 40); openModal("Our Sacred Vows", VOWS); }));

    $$(".ow-card").forEach((b) =>
      b.addEventListener("click", () => openModal("For you", `<p>${b.dataset.note}</p>`)));

    $("#kiss-btn").addEventListener("click", () => {
      burstPetals(innerWidth / 2, innerHeight * .3, 120);
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          const h = document.createElement("span");
          h.className = "music-note";
          h.textContent = "❤";
          h.style.left = rand(0, innerWidth) + "px";
          h.style.top = rand(innerHeight * .2, innerHeight) + "px";
          h.style.color = Math.random() < .5 ? "#C42A38" : "#D4AF37";
          h.style.fontSize = rand(14, 34) + "px";
          h.style.setProperty("--dx", rand(-60, 60) + "px");
          document.body.appendChild(h);
          setTimeout(() => h.remove(), 2600);
        }, i * 40);
      }
    });
  }

  /* ---------------------------------------------------------------
    12. THE 20 ENCHANTMENTS
  --------------------------------------------------------------- */
  function initMagic() {
    // 1 invisible ink
    const parch = $("#ink-parch"), flame = $("#ink-flame");
    const moveFlame = (e) => {
      const r = parch.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      flame.style.left = (p.clientX - r.left - 13) + "px";
      flame.style.top = (p.clientY - r.top - 13) + "px";
      parch.classList.add("lit");
      goldDust(p.clientX, p.clientY, 3);
    };
    parch.addEventListener("pointermove", moveFlame);
    parch.addEventListener("pointerleave", () => parch.classList.remove("lit"));

    // 2 love locks
    let locks = 0;
    $("#lock-btn").addEventListener("click", () => {
      if (locks >= 24) { $("#bridge").innerHTML = ""; locks = 0; }
      const l = document.createElement("i");
      l.className = "padlock";
      l.title = "A + B";
      $("#bridge").appendChild(l);
      locks++;
      goldDust(innerWidth / 2, innerHeight / 2, 12);
    });

    // 3 typewriter
    const TYPED = "P.S. I still get nervous before I text you. Two months in. Every single time.";
    let typing = false;
    $("#type-btn").addEventListener("click", () => {
      if (typing) return;
      typing = true;
      const out = $("#type-out"); out.textContent = "";
      let i = 0;
      const t = setInterval(() => {
        out.textContent += TYPED[i++];
        if (i >= TYPED.length) { clearInterval(t); typing = false; }
      }, 55);
    });

    // 4 hold for kisses
    const hh = $("#hold-heart"), fill = $("#meter-fill");
    let holdT = null, v = 0;
    const startHold = () => {
      holdT = setInterval(() => {
        v = Math.min(100, v + 2.5);
        fill.style.width = v + "%";
        const r = hh.getBoundingClientRect();
        goldDust(r.left + r.width / 2, r.top + r.height / 2, 4);
        if (v >= 100) { stopHold(); openModal("Warmth: 100%", "<p>Consider yourself thoroughly, ridiculously, permanently kissed.</p>"); v = 0; fill.style.width = "0%"; }
      }, 60);
    };
    const stopHold = () => { clearInterval(holdT); holdT = null; };
    hh.addEventListener("pointerdown", startHold);
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => hh.addEventListener(ev, stopHold));

    // 5 locket
    $("#locket").addEventListener("click", (e) => e.currentTarget.classList.toggle("open"));

    // 6 wheel
    const COMPLIMENTS = ["You are unfairly beautiful.", "Your kindness rearranges rooms.", "You laugh with your whole face.", "You make hard days survivable.", "You are the best decision I never had to make.", "Your voice is my favourite sound on earth."];
    let deg = 0;
    $("#wheel-btn").addEventListener("click", () => {
      deg += 1440 + Math.random() * 720;
      $("#wheel").style.transform = `rotate(${deg}deg)`;
      setTimeout(() => { $("#wheel-out").textContent = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]; }, 3200);
    });

    // 8 rose garden
    $("#garden").addEventListener("pointerdown", (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const rose = document.createElement("i");
      rose.className = "rose";
      rose.style.left = (e.clientX - r.left - 7) + "px";
      rose.style.top = (e.clientY - r.top - 7) + "px";
      e.currentTarget.appendChild(rose);
      goldDust(e.clientX, e.clientY, 8);
    });

    // 9 affirmations jar
    const AFFIRM = ["You are loved beyond measure today.", "You are allowed to rest. I've got you.", "Someone is thinking of you right now. It's me. It's always me.", "You are enough, exactly as you woke up."];
    $("#jar").addEventListener("click", () => {
      $("#jar-out").textContent = AFFIRM[Math.floor(Math.random() * AFFIRM.length)];
      goldDust(innerWidth / 2, innerHeight / 2, 16);
    });

    // 10 lanterns
    $("#lantern-btn").addEventListener("click", () => {
      const sky = $("#sky");
      for (let i = 0; i < 5; i++) {
        const l = document.createElement("i");
        l.className = "lantern";
        l.style.left = rand(6, 88) + "%";
        l.style.setProperty("--dx", rand(-30, 30) + "px");
        l.style.animationDelay = (i * .25) + "s";
        sky.appendChild(l);
        setTimeout(() => l.remove(), 7000);
      }
    });

    // 11 music box
    $("#mb-btn").addEventListener("click", () => {
      const mb = $("#musicbox");
      mb.classList.add("spin");
      chime([523, 659, 784, 880]);
      setTimeout(() => mb.classList.remove("spin"), 6000);
    });

    // 12 origami
    const FOLDS = ["one more fold…", "almost there…", "there it is —", "“I would choose you in any life, in any language, at any hour.”"];
    $("#origami").addEventListener("click", (e) => {
      const el = e.currentTarget;
      let s = (+el.dataset.stage + 1) % 4;
      el.dataset.stage = s;
      $("#origami-out").textContent = FOLDS[s];
    });

    // 13 mirror fog
    const fog = $("#fog");
    const fctx = fog.getContext("2d");
    function paintFog() {
      const r = fog.parentElement.getBoundingClientRect();
      fog.width = r.width; fog.height = r.height;
      fctx.globalCompositeOperation = "source-over";
      fctx.fillStyle = "rgba(226,222,214,.96)";
      fctx.fillRect(0, 0, fog.width, fog.height);
    }
    const wipe = (e) => {
      if (e.buttons === 0 && e.type === "pointermove") return;
      const r = fog.getBoundingClientRect();
      fctx.globalCompositeOperation = "destination-out";
      fctx.beginPath();
      fctx.arc(e.clientX - r.left, e.clientY - r.top, 26, 0, Math.PI * 2);
      fctx.fill();
    };
    fog.addEventListener("pointerdown", wipe);
    fog.addEventListener("pointermove", wipe);
    new IntersectionObserver((es, o) => { es.forEach((x) => { if (x.isIntersecting) { paintFog(); o.disconnect(); } }); }).observe(fog);

    // 14 globe pins
    $$(".pin").forEach((p) => p.addEventListener("click", (e) => {
      e.stopPropagation();
      $("#globe-out").textContent = p.dataset.place + " — pinned in gold, forever.";
      goldDust(e.clientX, e.clientY, 18);
    }));

    // 15 bottle
    $("#bottle").addEventListener("click", () => openModal("Message in a bottle",
      "<p>Whoever finds this: she is the reason. Return her safely to me, and tell her the sea agrees — she is extraordinary.</p>"));

    // 16 pocket watch
    const watch = $("#watch");
    watch.addEventListener("click", () => watch.classList.toggle("open"));
    setInterval(() => {
      const d = new Date();
      $(".hand.h", watch).style.transform = `rotate(${(d.getHours() % 12) * 30 + d.getMinutes() * .5}deg)`;
      $(".hand.m", watch).style.transform = `rotate(${d.getMinutes() * 6}deg)`;
      $(".hand.s", watch).style.transform = `rotate(${d.getSeconds() * 6}deg)`;
    }, 1000);

    // 17 music sheet
    const LYRICS = ["and", "you", "were", "the", "song", "before", "I", "knew", "the", "words"];
    const sheet = $("#sheet");
    LYRICS.forEach((w, i) => {
      const b = document.createElement("button");
      b.className = "note"; b.textContent = "♪"; b.title = w;
      b.addEventListener("click", () => {
        b.classList.add("lit");
        chime([440 + i * 55]);
        $("#sheet-out").textContent = $$(".note.lit", sheet).map((n) => n.title).join(" ");
      });
      sheet.appendChild(b);
    });

    // 18 heartbeat
    const pulse = $("#pulse");
    pulse.addEventListener("pointerenter", () => pulse.classList.add("beat"));
    pulse.addEventListener("pointerdown", () => pulse.classList.add("beat"));
    pulse.addEventListener("pointerleave", () => pulse.classList.remove("beat"));

    // 19 teacup
    const FORTUNES = ["The leaves say: a long life, warmly shared.", "The leaves say: he will still be looking at you like this in fifty years.", "The leaves say: two souls, one thread, no ending."];
    $("#teacup").addEventListener("click", (e) => {
      const c = e.currentTarget;
      c.classList.add("swirl");
      setTimeout(() => { c.classList.remove("swirl"); $("#tea-out").textContent = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]; }, 2800);
    });

    // 20 coupons
    const COUPONS = ["ONE FREE MASSAGE", "MIDNIGHT ICE CREAM", "BREAKFAST IN BED", "ONE UNINTERRUPTED HOUR OF ME LISTENING", "A SLOW DANCE, KITCHEN, NO MUSIC"];
    $("#coupon-btn").addEventListener("click", () => {
      const d = $("#dispenser");
      const c = document.createElement("span");
      c.className = "coupon";
      c.textContent = COUPONS[Math.floor(Math.random() * COUPONS.length)];
      $$(".coupon", d).forEach((x) => x.remove());
      d.appendChild(c);
    });
  }


  /* ---------------------------------------------------------------
    12b. REASONS I ADORE YOU + SHIMMER CONFETTI
  --------------------------------------------------------------- */
  function initExtras() {
    $$(".flipcard").forEach((c) => {
      const back = $(".fc-back", c);
      if (back) back.textContent = c.dataset.back || "";
      c.addEventListener("click", (e) => {
        c.classList.toggle("flipped");
        goldDust(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 14);
      });
    });

    const conf = $("#confetti");
    if (conf && !reduced) {
      for (let i = 0; i < 40; i++) {
        const c = document.createElement("i");
        c.style.left = rand(0, 100) + "%";
        c.style.animationDuration = rand(7, 16) + "s";
        c.style.animationDelay = rand(0, 12) + "s";
        c.style.opacity = rand(.35, .9);
        conf.appendChild(c);
      }
    }
  }

  /* soft synth chime (no assets needed) */
  let actx = null;
  function chime(freqs) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, actx.currentTime + i * .16);
        g.gain.exponentialRampToValueAtTime(.14, actx.currentTime + i * .16 + .02);
        g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + i * .16 + 1.1);
        o.connect(g).connect(actx.destination);
        o.start(actx.currentTime + i * .16);
        o.stop(actx.currentTime + i * .16 + 1.2);
      });
    } catch { /* audio unavailable */ }
  }

  /* ---------------------------------------------------------------
    13. MEMORY VAULT tilt
  --------------------------------------------------------------- */
  function initVault() {
    const wrap = $("#polaroids");
    wrap.addEventListener("pointermove", (e) => {
      $$(".polaroid", wrap).forEach((p) => {
        const r = p.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        p.style.transform = `rotateY(${dx * 9}deg) rotateX(${-dy * 9}deg) translateY(${Math.abs(dx) * -4}px)`;
      });
    });
    wrap.addEventListener("pointerleave", () => $$(".polaroid", wrap).forEach((p) => (p.style.transform = "")));
  }

  /* ---------------------------------------------------------------
    14. FINALE — stars, constellation, tracker, signature
  --------------------------------------------------------------- */
  function sizeStars() {
    scv = $("#stars"); if (!scv) return;
    const sec = $("#finale");
    const d = Math.min(devicePixelRatio || 1, 2);
    scv.width = sec.clientWidth * d; scv.height = sec.clientHeight * d;
    sctx = scv.getContext("2d");
    sctx.setTransform(d, 0, 0, d, 0, 0);
    stars = Array.from({ length: 180 }, () => ({
      x: rand(0, sec.clientWidth), y: rand(0, sec.clientHeight),
      r: rand(.4, 1.6), t: rand(0, Math.PI * 2), sp: rand(.008, .03),
    }));
  }
  function drawStars() {
    if (!sctx || !scv) return;
    sctx.clearRect(0, 0, scv.width, scv.height);
    stars.forEach((s) => {
      s.t += s.sp;
      sctx.globalAlpha = .35 + Math.abs(Math.sin(s.t)) * .65;
      sctx.fillStyle = "#F5E7C0";
      sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); sctx.fill();
    });
    sctx.globalAlpha = 1;
  }

  function initFinale() {
    sizeStars();

    const cont = $("#constellation");
    const svg = $("#const-lines");
    const chosen = [];
    $$(".node", cont).forEach((n) => n.addEventListener("click", () => {
      n.classList.add("on");
      const r = n.getBoundingClientRect(), cr = cont.getBoundingClientRect();
      const pt = { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height / 2 };
      if (chosen.length) {
        const a = chosen[chosen.length - 1];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
        line.setAttribute("x2", pt.x); line.setAttribute("y2", pt.y);
        line.setAttribute("stroke", "#D4AF37");
        line.setAttribute("stroke-width", "1.4");
        line.setAttribute("opacity", ".85");
        line.style.filter = "drop-shadow(0 0 6px rgba(212,175,55,.9))";
        svg.appendChild(line);
      }
      chosen.push(pt);
      goldDust(r.left + r.width / 2, r.top + r.height / 2, 20);
    }));

    // live tracker
    const start = new Date(CONFIG.lovingSince).getTime();
    const el = $("#tracker");
    setInterval(() => {
      let ms = Date.now() - start;
      if (ms < 0) ms = 0;
      const s = Math.floor(ms / 1000);
      const years = Math.floor(s / 31557600);
      const months = Math.floor((s % 31557600) / 2629800);
      const days = Math.floor((s % 2629800) / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      el.textContent = `${years} Years, ${months} Months, ${days} Days, ${h} Hours, ${m} Minutes, ${sec} Seconds`;
    }, 1000);
    el.textContent = el.textContent;

    // signature writes on view
    const sig = $(".signature");
    new IntersectionObserver((es, o) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        sig.classList.add("write");
        setTimeout(() => $(".sig-text").classList.add("in"), 3200);
        o.disconnect();
      });
    }, { threshold: .3 }).observe(sig);
  }

  /* ---------------------------------------------------------------
    15. BOOT (after the envelope opens)
  --------------------------------------------------------------- */
  function initAfterOpen() {
    observeReveals();
    magnetise();
    initAudio();
    initChapters();
    initMagic();
    initExtras();
    initVault();
    initFinale();
    onScroll();
    addEventListener("resize", () => { sizeStars(); });
  }
})();
