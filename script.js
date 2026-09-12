/* ==========================================================================
   LUXURY WEDDING INVITATION WEBSITE - SCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  updateCountdown();
  setInterval(updateCountdown, 1000);
  // 1. STATE MANAGEMENT
  const weddingState = {
    groomName: 'Nithin',
    brideName: 'Adithya',
    weddingDate: new Date('2026-10-15T16:00:00'),
    venueName: 'Villa Bella Vista',
    locationName: 'Amalfi Coast, Italy',
    isPlayingAudio: false,
    audioContext: null,
    oscillatorInterval: null,
    wishes: JSON.parse(localStorage.getItem('wedding_wishes')) || [
      { name: 'Aunt Evelyn & Uncle James', message: 'Wishing you both a lifetime of love, laughter, and endless happiness!', date: 'Yesterday' },
      { name: 'Marcus & Sophia', message: 'So happy to celebrate your special day with you! Cheers to forever!', date: '2 days ago' },
      { name: 'David & Clara', message: 'May your joined life be even more beautiful than your grand celebration.', date: '3 days ago' }
    ]
  };

  // DOM Elements
  const audioToggle = document.getElementById('audio-toggle');
  const vinylIcon = document.getElementById('vinyl-icon');
  const flipCardBtn = document.getElementById('flip-card-btn');
  const invitationCard3D = document.getElementById('invitation-card-3d');
  const rsvpForm = document.getElementById('rsvp-form');
  const wishingForm = document.getElementById('wishing-form');
  const wishesGrid = document.getElementById('wishes-grid');
  const customizerToggle = document.getElementById('customizer-toggle');
  const customizerDrawer = document.getElementById('customizer-drawer');
  const closeCustomizerBtn = document.getElementById('close-customizer');
  const applyCustomizerBtn = document.getElementById('apply-customizer');
  const calendarBtn = document.getElementById('calendar-btn');

  // Initialize Floating Rose Petals Animation directly
  initPetalsCanvas();

  // 3. SYNTHESIZED ROMANTIC AUDIO ENGINE (Web Audio API)
  function toggleAudio(forceState) {
    const newState = forceState !== undefined ? forceState : !weddingState.isPlayingAudio;
    weddingState.isPlayingAudio = newState;

    if (weddingState.isPlayingAudio) {
      startAmbientMusic();
      vinylIcon.classList.add('spinning');
      audioToggle.querySelector('span').textContent = 'Pause Music';
    } else {
      stopAmbientMusic();
      vinylIcon.classList.remove('spinning');
      audioToggle.querySelector('span').textContent = 'Play Music';
    }
  }

  audioToggle.addEventListener('click', () => toggleAudio());



  function startAmbientMusic() {
    try {
      if (!weddingState.audioContext) {
        weddingState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = weddingState.audioContext;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Soft romantic arpeggio chord progression (Cmaj7 -> Am7 -> Fmaj7 -> G)
      const chordNotes = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ];
      let chordIndex = 0;

      weddingState.oscillatorInterval = setInterval(() => {
        if (!weddingState.isPlayingAudio) return;
        const currentChord = chordNotes[chordIndex];
        const note = currentChord[Math.floor(Math.random() * currentChord.length)];
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.5);

        chordIndex = (chordIndex + 1) % chordNotes.length;
      }, 900);
    } catch (e) {
      console.log('Web Audio API unavailable', e);
    }
  }

  function stopAmbientMusic() {
    if (weddingState.oscillatorInterval) {
      clearInterval(weddingState.oscillatorInterval);
    }
  }

  // 4. COUNTDOWN TIMER ENGINE
// ============================================================
// COUNTDOWN TIMER
// Wedding: October 11, 2026 — 8:30 AM IST
// ============================================================

function updateCountdown() {

    // IMPORTANT:
    // +05:30 = India Standard Time (IST)
    const weddingDate = new Date("2026-10-11T08:30:00+05:30");

    const now = new Date();

    const distance = weddingDate.getTime() - now.getTime();


    // Get HTML elements
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    // Safety check
    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        console.error("Countdown elements not found!");
        return;
    }


    // Wedding date has arrived
    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    // Calculate remaining time

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    // Update HTML

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


// Run immediately



// Update every second


  // 5. 3D CARD FLIP CONTROLLER
  if (flipCardBtn && invitationCard3D) {
    flipCardBtn.addEventListener('click', () => {
      invitationCard3D.classList.toggle('flipped');
    });
  }

  // 6. FLOATING ROSE PETALS CANVAS ANIMATION
  function initPetalsCanvas() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const petalColors = [
      'rgba(212, 175, 55, 0.65)',  // Royal Gold
      'rgba(197, 155, 39, 0.55)',  // Polished Gold Leaf
      'rgba(245, 230, 163, 0.7)',  // Champagne
      'rgba(255, 248, 235, 0.8)'   // Pearl Ivory
    ];

    const petals = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  // 7. LIGHTBOX GALLERY CONTROLLER
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      lightboxImg.src = imgSrc;
      lightboxModal.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 8. RSVP FORM & CONFETTI BURST
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guest-name').value;
      const status = document.querySelector('input[name="attending"]:checked')?.value || 'Yes';
      
      triggerConfetti();

      alert(`✨ Thank you, ${name}! Your RSVP (${status}) has been joyfully recorded.`);
      rsvpForm.reset();
    });
  }

  function triggerConfetti() {
    const confettiCanvas = document.getElementById('confetti-canvas');
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const particles = Array.from({ length: 120 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: ['#D4AF37', '#F3E5AB', '#E0A96D', '#FFFFFF', '#FFD700'][Math.floor(Math.random() * 5)],
      life: 100
    }));

    function drawConfetti() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3; // gravity
          p.life -= 1;

          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      if (alive) {
        requestAnimationFrame(drawConfetti);
      }
    }
    drawConfetti();
  }

  // 9. WISHING WELL GUESTBOOK
  function renderWishes() {
    if (!wishesGrid) return;
    wishesGrid.innerHTML = '';
    weddingState.wishes.forEach(wish => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.innerHTML = `
        <div class="wish-author">${escapeHtml(wish.name)}</div>
        <p class="wish-text">"${escapeHtml(wish.message)}"</p>
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 10px;">${wish.date}</span>
      `;
      wishesGrid.appendChild(card);
    });
  }

  if (wishingForm) {
    wishingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('wish-name').value;
      const message = document.getElementById('wish-message').value;

      if (author && message) {
        weddingState.wishes.unshift({ name: author, message: message, date: 'Just now' });
        localStorage.setItem('wedding_wishes', JSON.stringify(weddingState.wishes));
        renderWishes();
        wishingForm.reset();
        triggerConfetti();
      }
    });
  }

  renderWishes();

  // 10. ADD TO CALENDAR (.ics Generator)
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      const title = `${weddingState.brideName} & ${weddingState.groomName}'s Wedding`;
      const location = `${weddingState.venueName}, ${weddingState.locationName}`;
      const description = `Join us in celebrating the wedding of ${weddingState.brideName} & ${weddingState.groomName}!`;
      
      const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation Website//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:20261015T160000Z
DTEND:20261015T230000Z
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'wedding-save-the-date.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // 11. LIVE CUSTOMIZER DRAWER
  if (customizerToggle && customizerDrawer) {
    customizerToggle.addEventListener('click', () => {
      customizerDrawer.classList.toggle('active');
    });

    closeCustomizerBtn.addEventListener('click', () => {
      customizerDrawer.classList.remove('active');
    });

    const themeSwatches = document.querySelectorAll('.theme-swatch');
    themeSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const theme = swatch.dataset.theme;
        document.body.className = '';
        if (theme !== 'default') {
          document.body.classList.add(`theme-${theme}`);
        }
        themeSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });

    if (applyCustomizerBtn) {
      applyCustomizerBtn.addEventListener('click', () => {
        const inputGroom = document.getElementById('cust-groom').value;
        const inputBride = document.getElementById('cust-bride').value;
        const inputVenue = document.getElementById('cust-venue').value;

        if (inputGroom) {
          weddingState.groomName = inputGroom;
          document.querySelectorAll('.groom-name-text').forEach(el => el.textContent = inputGroom);
        }
        if (inputBride) {
          weddingState.brideName = inputBride;
          document.querySelectorAll('.bride-name-text').forEach(el => el.textContent = inputBride);
        }
        if (inputVenue) {
          weddingState.venueName = inputVenue;
          document.querySelectorAll('.venue-name-text').forEach(el => el.textContent = inputVenue);
        }

        customizerDrawer.classList.remove('active');
        triggerConfetti();
      });
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }
});
