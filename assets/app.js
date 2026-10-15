/**
 * WishCard - Complete Interactive & Animation Engine
 * Reverse-Engineered from Production & Enhanced with Full Autoplay State Machines
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTrendingCarousel();
  initAutoplayAnimations();
  initTestimonialsSlider();
  initHowItWorksModal();
  initCardStudioModal();
  initConfetti();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const toggleBtn = document.querySelector('.navbar__toggle');
  const navbar = document.querySelector('.navbar');
  const dropdownTrigger = document.querySelector('.navbar__dropdown-trigger');
  const dropdownContainer = document.querySelector('.navbar__has-dropdown');
  const chevron = document.querySelector('.navbar__chevron');

  // Create mobile menu element if not already in DOM
  let mobileMenu = document.querySelector('.navbar__mobile-menu');
  if (!mobileMenu) {
    mobileMenu = document.createElement('ul');
    mobileMenu.className = 'navbar__mobile-menu';
    mobileMenu.style.display = 'none';
    mobileMenu.innerHTML = `
      <li><a href="cards.html" class="navbar__mobile-link">Cards</a></li>
      <li>
        <button class="navbar__mobile-link navbar__mobile-dropdown-trigger">
          <span>Categories</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="navbar__mobile-chevron"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <ul class="navbar__mobile-submenu" style="display: none;">
          <li><a href="javascript:void(0)" onclick="openStudio('birthday')" class="navbar__mobile-submenu-item">Virtual Birthday Bash</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('sorry')" class="navbar__mobile-submenu-item">Sorry Card</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('proposal')" class="navbar__mobile-submenu-item">The Perfect Proposal</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('puzzle')" class="navbar__mobile-submenu-item">Surprise Photo Puzzle</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('anniversary')" class="navbar__mobile-submenu-item">Anniversary Special</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('friendship')" class="navbar__mobile-submenu-item">Friendship Day Card</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('mothers')" class="navbar__mobile-submenu-item">Mother's Day</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('thank-you')" class="navbar__mobile-submenu-item">Thank You Card</a></li>
          <li><a href="javascript:void(0)" onclick="openStudio('miss-you')" class="navbar__mobile-submenu-item">Miss You Card</a></li>
        </ul>
      </li>
      <li><a href="#testimonials" class="navbar__mobile-link">Testimonials</a></li>
      <li><a href="cards.html" class="navbar__mobile-link">All Cards Catalog</a></li>
    `;
    navbar.appendChild(mobileMenu);
  }

  // Toggle mobile menu
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'block';
      mobileMenu.style.display = isOpen ? 'none' : 'block';
      toggleBtn.setAttribute('aria-expanded', !isOpen);
    });
  }

  // Mobile submenu accordion
  const mobileDropTrigger = mobileMenu.querySelector('.navbar__mobile-dropdown-trigger');
  const mobileSubmenu = mobileMenu.querySelector('.navbar__mobile-submenu');
  const mobileChevron = mobileMenu.querySelector('.navbar__mobile-chevron');
  if (mobileDropTrigger && mobileSubmenu) {
    mobileDropTrigger.addEventListener('click', () => {
      const isSubOpen = mobileSubmenu.style.display === 'block';
      mobileSubmenu.style.display = isSubOpen ? 'none' : 'block';
      if (mobileChevron) {
        mobileChevron.style.transform = isSubOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // Desktop dropdown toggle on click / hover
  if (dropdownTrigger && dropdownContainer) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownContainer.classList.toggle('navbar__has-dropdown--open');
      if (chevron) {
        chevron.classList.toggle('navbar__chevron--open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove('navbar__has-dropdown--open');
        if (chevron) chevron.classList.remove('navbar__chevron--open');
      }
    });
  }
}

/* ==========================================================================
   2. TRENDING CAROUSEL (ARROWS & SCROLL INDICATOR)
   ========================================================================== */
function initTrendingCarousel() {
  const carousel = document.querySelector('.trending__carousel');
  const leftBtn = document.querySelector('.trending__arrow[aria-label="Scroll left"]');
  const rightBtn = document.querySelector('.trending__arrow[aria-label="Scroll right"]');
  const thumb = document.querySelector('.trending__scroll-thumb');

  if (!carousel) return;
  const scrollStep = 340;

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
  }

  if (thumb) {
    const updateThumb = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (maxScroll > 0) {
        const pct = (carousel.scrollLeft / maxScroll) * 60;
        thumb.style.left = `${pct}%`;
      }
    };
    carousel.addEventListener('scroll', updateThumb, { passive: true });
    updateThumb();
  }
}

/* ==========================================================================
   3. CONTINUOUS AUTOPLAY STATE MACHINES & INTERACTION
   ========================================================================== */
function initAutoplayAnimations() {
  startValentineAutoplay();
  startBirthdayAutoplay();
  startSorryAutoplay();
  startPuzzleAutoplay();
  startAnniversaryAutoplay();
  startFriendshipAutoplay();
}

/**
 * 3.1 VALENTINE / PROPOSAL AUTOPLAY STATE MACHINE
 * Cursor glides to 'No', 'No' dodges 6 times, cursor moves to 'Yes', clicks 'Yes', celebration!
 */
function startValentineAutoplay() {
  const container = document.querySelector('.trending__preview--valentine');
  if (!container) return;

  let isInteracted = false;
  let loopTimer = null;

  const runLoop = () => {
    if (isInteracted) return;

    container.innerHTML = `
      <div class="vt-container">
        <div class="vt-scale-wrapper">
          <img src="assets/IMG_5723.webp" class="vt-image" alt="Valentine"/>
          <p class="vt-title">Divya will you be forever mine?</p>
          <div class="vt-buttons-row">
            <button class="vt-yes-btn" style="transform:scale(1)">Yes</button>
            <button class="vt-no-btn" style="transform:translate(0px, 0px) scale(1)">No</button>
          </div>
          <p class="vt-hint">"No" seems a bit shy</p>
        </div>
        <div class="vt-cursor" style="opacity:0;transform:translate(185px, 218px); transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;">
          <svg width="17" height="24" viewBox="0 0 17 24"><path d="M0 0 L0 20 L4.5 15.5 L8 23 L11 21.5 L7.5 14 L13 14 Z" fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"></path></svg>
        </div>
      </div>
    `;

    const noBtn = container.querySelector('.vt-no-btn');
    const yesBtn = container.querySelector('.vt-yes-btn');
    const hint = container.querySelector('.vt-hint');
    const cursor = container.querySelector('.vt-cursor');
    const wrapper = container.querySelector('.vt-scale-wrapper');

    // Interactive override on user hover/touch
    const manualDodge = (e) => {
      if (e) e.preventDefault();
      isInteracted = true;
      clearTimeout(loopTimer);
      if (cursor) cursor.style.opacity = '0';

      const x = (Math.random() * 140 - 70).toFixed(0);
      const y = (Math.random() * 80 - 40).toFixed(0);
      noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.85)`;
      yesBtn.style.transform = `scale(1.25)`;
      hint.textContent = 'Nice try! You cannot say No! 😜';
    };

    noBtn.addEventListener('mouseenter', manualDodge);
    noBtn.addEventListener('touchstart', manualDodge, { passive: false });

    yesBtn.addEventListener('click', () => {
      isInteracted = true;
      clearTimeout(loopTimer);
      triggerValentineCelebration(wrapper, container);
    });

    // Automated loop sequence
    const dodges = [
      { x: 55, y: -30, hint: 'Are you sure? 🥺' },
      { x: -65, y: 25, hint: 'Think again! 😜' },
      { x: 70, y: 35, hint: 'You cannot say No! 💕' },
      { x: -60, y: -35, hint: 'Just say YES already! 🥰' }
    ];

    let step = 0;
    const executeStep = () => {
      if (isInteracted) return;

      if (step === 0) {
        cursor.style.opacity = '1';
        cursor.style.transform = 'translate(195px, 155px)';
        loopTimer = setTimeout(() => { step++; executeStep(); }, 700);
      } else if (step <= dodges.length) {
        const d = dodges[step - 1];
        noBtn.style.transform = `translate(${d.x}px, ${d.y}px) scale(${Math.max(0.65, 1 - step * 0.08)})`;
        yesBtn.style.transform = `scale(${1 + step * 0.08})`;
        hint.textContent = d.hint;

        // Move cursor towards new No position
        cursor.style.transform = `translate(${185 + d.x * 0.6}px, ${145 + d.y * 0.6}px)`;

        loopTimer = setTimeout(() => { step++; executeStep(); }, 850);
      } else if (step === dodges.length + 1) {
        // Cursor glides towards Yes
        cursor.style.transform = 'translate(110px, 150px)';
        loopTimer = setTimeout(() => { step++; executeStep(); }, 650);
      } else if (step === dodges.length + 2) {
        // Clicks Yes
        yesBtn.style.transform = 'scale(1.35)';
        cursor.style.transform = 'translate(110px, 150px) scale(0.85)';
        loopTimer = setTimeout(() => {
          cursor.style.opacity = '0';
          triggerValentineCelebration(wrapper, container);
          // Wait 6 seconds, then restart loop
          loopTimer = setTimeout(() => {
            isInteracted = false;
            runLoop();
          }, 6500);
        }, 350);
      }
    };

    loopTimer = setTimeout(executeStep, 1000);
  };

  function triggerValentineCelebration(wrapper, cont) {
    fireConfetti(cont);
    wrapper.innerHTML = `
      <div class="vt-result" style="animation: vtResultIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;">
        <span style="font-size: 3.2rem; margin-bottom: 6px;">💖💍🎉</span>
        <h3 class="vt-result-title" style="color: #e8456b; font-size: 1.35rem; margin: 0 0 4px;">She Said YES! 💖</h3>
        <p class="vt-result-sub" style="color: #6e5c62; font-size: 0.85rem; margin: 0 0 12px;">Knew you'd say yes!</p>
        <button class="vt-yes-btn" style="padding: 6px 18px; font-size: 12px; min-width: auto;" onclick="startValentineAutoplay()">Replay 💫</button>
      </div>
    `;
  }

  runLoop();
}

/**
 * 3.2 BIRTHDAY CARD AUTOPLAY STATE MACHINE
 * QR scan -> Countdown 03.. 02.. 01.. -> Balloons pop -> Cake candles blow -> Letter typewriter!
 */
function startBirthdayAutoplay() {
  const container = document.querySelector('.trending__preview--birthday');
  if (!container) return;

  const content = container.querySelector('.bd-content') || container;
  let loopTimer = null;

  const timeline = [
    { id: 'qr', duration: 2400 },
    { id: 'countdown', duration: 2200 },
    { id: 'balloons', duration: 3200 },
    { id: 'cake', duration: 2400 },
    { id: 'letter', duration: 5000 }
  ];

  let currentIdx = 0;

  const renderStage = () => {
    const stage = timeline[currentIdx];

    if (stage.id === 'qr') {
      content.innerHTML = `
        <div class="bd-screen bd-screen--center">
          <div class="bd-qr-container">
            <div class="bd-qr-card">
              <img src="assets/birthday_qr.webp" class="bd-qr-img" alt="Birthday QR"/>
              <div class="bd-qr-label">Divya's Birthday!</div>
              <div class="bd-qr-scanline"></div>
            </div>
            <span class="bd-hint">Tap to open</span>
          </div>
        </div>
      `;
    } else if (stage.id === 'countdown') {
      content.innerHTML = `
        <div class="bd-screen bd-screen--celeb">
          <span class="bd-inv-sub">Virtual Birthday Bash</span>
          <span class="bd-inv-name">Happy Birthday Divya</span>
          <div class="bd-inv-divider"></div>
          <span class="bd-inv-begin">Party begins now</span>
          <div class="bd-timer-row">
            <div class="bd-timer-col"><span class="bd-timer-num">00</span><span class="bd-timer-lbl">hrs</span></div>
            <span class="bd-timer-colon">:</span>
            <div class="bd-timer-col"><span class="bd-timer-num">00</span><span class="bd-timer-lbl">min</span></div>
            <span class="bd-timer-colon">:</span>
            <div class="bd-timer-col"><span id="bd-ticker-sec" class="bd-timer-num">03</span><span class="bd-timer-lbl">sec</span></div>
          </div>
          <button class="bd-btn bd-btn--click">BEGIN 🎉</button>
        </div>
      `;
      let s = 3;
      const tick = setInterval(() => {
        s--;
        const el = document.getElementById('bd-ticker-sec');
        if (el) el.textContent = String(s).padStart(2, '0');
        if (s <= 1) clearInterval(tick);
      }, 700);
    } else if (stage.id === 'balloons') {
      content.innerHTML = `
        <div class="bd-screen" style="padding: 10px;">
          <div class="bd-lights">
            <span class="bd-light-bulb" style="background:#ff4757;"></span>
            <span class="bd-light-bulb" style="background:#ffd700;"></span>
            <span class="bd-light-bulb" style="background:#00d2ff;"></span>
            <span class="bd-light-bulb" style="background:#7bed9f;"></span>
          </div>
          <p style="color: #fff; font-size: 11px; margin-bottom: 8px; font-weight: 600;">Popping Balloons! 🎈</p>
          <div class="bd-balloons-row">
            <div class="bd-balloon-wrapper" id="balloon-0">
              <div class="bd-balloon-visual">
                <div class="bd-balloon-body" style="background: #e86b86;"></div>
                <div class="bd-balloon-highlight"></div>
                <div class="bd-balloon-text-outer"><span class="bd-balloon-text">You</span></div>
              </div>
              <div class="bd-balloon-string"></div>
            </div>
            <div class="bd-balloon-wrapper" id="balloon-1">
              <div class="bd-balloon-visual">
                <div class="bd-balloon-body" style="background: #e1a334;"></div>
                <div class="bd-balloon-highlight"></div>
                <div class="bd-balloon-text-outer"><span class="bd-balloon-text">are</span></div>
              </div>
              <div class="bd-balloon-string"></div>
            </div>
            <div class="bd-balloon-wrapper" id="balloon-2">
              <div class="bd-balloon-visual">
                <div class="bd-balloon-body" style="background: #4db66a;"></div>
                <div class="bd-balloon-highlight"></div>
                <div class="bd-balloon-text-outer"><span class="bd-balloon-text">so</span></div>
              </div>
              <div class="bd-balloon-string"></div>
            </div>
            <div class="bd-balloon-wrapper" id="balloon-3">
              <div class="bd-balloon-visual">
                <div class="bd-balloon-body" style="background: #4d8fd0;"></div>
                <div class="bd-balloon-highlight"></div>
                <div class="bd-balloon-text-outer"><span class="bd-balloon-text">special</span></div>
              </div>
              <div class="bd-balloon-string"></div>
            </div>
          </div>
        </div>
      `;

      // Pop sequentially
      [0, 1, 2, 3].forEach((i, idx) => {
        setTimeout(() => {
          const b = document.getElementById(`balloon-${i}`);
          if (b) {
            const body = b.querySelector('.bd-balloon-body');
            const text = b.querySelector('.bd-balloon-text');
            const str = b.querySelector('.bd-balloon-string');
            if (body) body.classList.add('bd-balloon-body--popped');
            if (text) text.classList.add('bd-balloon-text--revealed');
            if (str) str.classList.add('bd-balloon-string--gone');
          }
        }, 450 + idx * 550);
      });
    } else if (stage.id === 'cake') {
      content.innerHTML = `
        <div class="bd-screen" style="padding: 10px;">
          <div class="bd-cake-title-row">
            <span class="bd-cake-letter bd-cake-letter--c0">H</span>
            <span class="bd-cake-letter bd-cake-letter--c1">B</span>
            <span class="bd-cake-letter bd-cake-letter--c2">D</span>
            <span class="bd-cake-letter bd-cake-letter--c3">!</span>
          </div>
          <div id="bd-cake-visual" style="font-size: 3.5rem; line-height: 1; margin: 4px 0; text-align: center;">
            🎂🕯️
          </div>
          <button id="bd-cake-btn" class="bd-btn bd-btn--sm bd-btn--cake-action">Blow Candle 🕯️</button>
        </div>
      `;

      // Blow candle after 1.1s
      setTimeout(() => {
        const visual = document.getElementById('bd-cake-visual');
        const btn = document.getElementById('bd-cake-btn');
        if (visual) visual.innerHTML = '🎂🎉✨';
        if (btn) btn.textContent = 'Candles Blown! 🥳';
        fireConfetti(container);
      }, 1200);
    } else if (stage.id === 'letter') {
      content.innerHTML = `
        <div class="bd-screen" style="padding: 8px;">
          <div class="bd-letter-card bd-letter-card--appear" style="width: 90%; padding: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <h4 class="bd-letter-title" style="margin: 0 0 4px; font-size: 11px;">Dear Divya,</h4>
            <p id="bd-auto-typewriter" class="bd-letter-body" style="font-size: 9.5px; line-height: 1.45; color: #5a3e42; margin: 0; min-height: 50px; font-family: cursive;"></p>
          </div>
        </div>
      `;
      typewriterEffect('bd-auto-typewriter', "Happy Birthday to someone who brings so much joy into everyone's life! May all your wishes come true today and always. ❤️", 22);
    }

    loopTimer = setTimeout(() => {
      currentIdx = (currentIdx + 1) % timeline.length;
      renderStage();
    }, stage.duration);
  };

  renderStage();
}

/**
 * 3.3 SORRY CARD AUTOPLAY STATE MACHINE
 * QR scan -> Greeting -> Forgiveness Meter -> Envelope tap & open -> Apology note
 */
function startSorryAutoplay() {
  const container = document.querySelector('.trending__preview--sorry');
  if (!container) return;

  const wrapper = container.querySelector('.sorry-preview-wrapper') || container;
  let loopTimer = null;

  const timeline = [
    { id: 'qr', duration: 2500 },
    { id: 'greeting', duration: 2400 },
    { id: 'meter', duration: 3200 },
    { id: 'envelope', duration: 2200 },
    { id: 'note', duration: 5500 }
  ];

  let currentIdx = 0;

  const renderStage = () => {
    const stage = timeline[currentIdx];

    if (stage.id === 'qr') {
      wrapper.innerHTML = `
        <div class="sorry-screen">
          <div class="qr-card qr-pop-in">
            <img src="assets/heart_qr.webp" class="qr-img" alt="QR"/>
            <div class="qr-overlay"><span class="qr-overlay-text">Someone</span></div>
            <div class="scan-line"></div>
          </div>
          <span class="hint-text hint-text--mt">Scanning surprise...</span>
        </div>
      `;
    } else if (stage.id === 'greeting') {
      wrapper.innerHTML = `
        <div class="sorry-screen" style="animation: noteAppear 0.4s ease forwards;">
          <div class="greeting-char-container">
            <span style="font-size: 2.8rem;">🥺🐾</span>
            <div class="greeting-hearts">
              <span class="floating-heart floating-heart--1">❤️</span>
              <span class="floating-heart floating-heart--2">💝</span>
              <span class="floating-heart floating-heart--3">💖</span>
            </div>
          </div>
          <p class="greeting-text" style="font-size: 18px; margin: 6px 0 2px;">I am so sorry...</p>
          <p class="greeting-sub" style="margin: 0 0 10px;">Will you please forgive me?</p>
          <button class="btn-pink" style="font-size: 11px; padding: 6px 16px;">Forgive Me 🥺</button>
        </div>
      `;
    } else if (stage.id === 'meter') {
      wrapper.innerHTML = `
        <div class="sorry-screen" style="animation: noteAppear 0.4s ease forwards;">
          <p class="meter-label">Measuring Love & Forgiveness</p>
          <p id="sorry-pct-text" class="meter-percent" style="font-size: 32px; color: #ff69b4;">0%</p>
          <div class="meter-track" style="width: 85%;">
            <div id="sorry-pct-bar" class="meter-fill" style="width: 0%; background: linear-gradient(90deg, #ff69b4, #e91e8c);"></div>
          </div>
          <p id="sorry-warn" class="warn-text" style="display:none; color: #ff758c; margin-top: 8px;">❤️ OVERFLOW: 120% FORGIVEN! ❤️</p>
        </div>
      `;

      let progress = 0;
      const meterInterval = setInterval(() => {
        progress += 5;
        const pctText = document.getElementById('sorry-pct-text');
        const pctBar = document.getElementById('sorry-pct-bar');
        const warn = document.getElementById('sorry-warn');

        if (pctText && pctBar) {
          pctText.textContent = `${progress}%`;
          pctBar.style.width = `${Math.min(progress, 100)}%`;

          if (progress >= 100) {
            pctText.classList.add('meter-percent--overflow');
            if (warn) warn.style.display = 'block';
          }
        }

        if (progress >= 120) {
          clearInterval(meterInterval);
          fireConfetti(container);
        }
      }, 90);
    } else if (stage.id === 'envelope') {
      wrapper.innerHTML = `
        <div class="sorry-screen">
          <div class="envelope-wrapper envelope-tap">
            <span style="font-size: 3.5rem;">💌</span>
            <p class="envelope-label" style="font-size: 12px; margin-top: 6px;">Opening personal letter...</p>
          </div>
        </div>
      `;
    } else if (stage.id === 'note') {
      wrapper.innerHTML = `
        <div class="sorry-screen" style="animation: noteAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;">
          <div class="note-card" style="padding: 14px; border-radius: 12px; width: 92%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <span style="font-size: 1.8rem;">💝</span>
            <h4 style="color: #e91e8c; margin: 2px 0 6px; font-size: 12px;">I'm Really Sorry, Cutiepie</h4>
            <p id="sorry-typewriter" style="color: #5a3e42; font-size: 10px; line-height: 1.45; margin: 0; font-family: cursive;"></p>
          </div>
        </div>
      `;
      typewriterEffect('sorry-typewriter', "I accidentally upset the most precious person in my world — you. Please forgive me, I promise I didn't mean to. Ice cream date on me? 🍦🥺💕", 20);
    }

    loopTimer = setTimeout(() => {
      currentIdx = (currentIdx + 1) % timeline.length;
      renderStage();
    }, stage.duration);
  };

  renderStage();
}

/**
 * 3.4 SURPRISE PHOTO PUZZLE AUTOPLAY STATE MACHINE
 * Scrambled pieces -> Cursor solves puzzle -> ✅ Solved badge -> Love message reveal!
 */
function startPuzzleAutoplay() {
  const container = document.querySelector('.trending__preview--puzzle');
  if (!container) return;

  let loopTimer = null;

  const runLoop = () => {
    container.innerHTML = `
      <div class="pz-container">
        <div class="pz-scale-wrapper">
          <div class="pz-grid-wrapper">
            <div class="pz-grid-card">
              <div class="pz-grid" style="width:169px;height:169px">
                <div id="pz-0" class="pz-piece" style="transform:translate(55px, 55px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:0px 0px"></div>
                <div id="pz-1" class="pz-piece" style="transform:translate(0px, 0px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-55px 0px"></div>
                <div id="pz-2" class="pz-piece" style="transform:translate(110px, 0px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-110px 0px"></div>
                <div id="pz-3" class="pz-piece" style="transform:translate(0px, 55px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:0px -55px"></div>
                <div id="pz-4" class="pz-piece" style="transform:translate(110px, 110px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-55px -55px"></div>
                <div id="pz-5" class="pz-piece" style="transform:translate(110px, 55px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-110px -55px"></div>
                <div id="pz-6" class="pz-piece" style="transform:translate(0px, 110px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:0px -110px"></div>
                <div id="pz-7" class="pz-piece" style="transform:translate(55px, 110px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-55px -110px"></div>
                <div id="pz-8" class="pz-piece" style="transform:translate(55px, 0px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-110px -110px"></div>
                <div id="pz-badge" class="pz-overlay-badge"><span>✨ Solving...</span></div>
                <div id="pz-cur" class="pz-cursor" style="opacity:1;transform:translate(60px, 60px);"><svg width="18" height="24" viewBox="0 0 16 20"><path d="M 1 1 L 1 16 L 4.5 12 L 7.5 19 L 10 18 L 7 11 L 11 11 Z" fill="#000" stroke="#FFF" stroke-width="1.5" stroke-linejoin="round"></path></svg></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Solve after 1.8s
    loopTimer = setTimeout(() => {
      // Realign to solved grid
      const correctCoords = [
        { x: 0, y: 0 }, { x: 55, y: 0 }, { x: 110, y: 0 },
        { x: 0, y: 55 }, { x: 55, y: 55 }, { x: 110, y: 55 },
        { x: 0, y: 110 }, { x: 55, y: 110 }, { x: 110, y: 110 }
      ];
      correctCoords.forEach((c, i) => {
        const piece = document.getElementById(`pz-${i}`);
        if (piece) {
          piece.style.transition = 'transform 0.6s ease';
          piece.style.transform = `translate(${c.x}px, ${c.y}px)`;
        }
      });

      const badge = document.getElementById('pz-badge');
      if (badge) {
        badge.innerHTML = '<span style="background: rgba(16, 185, 129, 0.9);">✅ Solved!</span>';
      }

      const cur = document.getElementById('pz-cur');
      if (cur) cur.style.opacity = '0';

      fireConfetti(container);

      // Reveal special message
      loopTimer = setTimeout(() => {
        container.innerHTML = `
          <div class="pz-container">
            <div class="pz-msg-container pz-msg-container--visible" style="opacity: 1; transform: scale(1);">
              <div class="pz-msg-emojis">💖✨💜</div>
              <h4 class="pz-msg-title">A Special Message <span>♥</span></h4>
              <div class="pz-msg-card">
                <p class="pz-msg-note">"You put the pieces of my heart together. You make every day brighter just by being you! 💫"</p>
              </div>
              <div class="pz-msg-img-wrapper">
                <img src="assets/Logo-Selfi.webp" class="pz-msg-img" alt="Photo" />
              </div>
            </div>
          </div>
        `;

        // Restart loop after 5.5s
        loopTimer = setTimeout(runLoop, 5500);
      }, 1800);
    }, 1800);
  };

  runLoop();
}

/**
 * 3.5 ANNIVERSARY SPECIAL IPHONE MOCKUP AUTOPLAY
 * Falling hearts -> Countdown -> Couple -> Love Meter 100% -> Letter -> Bouquet
 */
function startAnniversaryAutoplay() {
  const container = document.querySelector('.trending__preview--anniversary');
  if (!container) return;

  const phone = container.querySelector('.tpda-phone') || container;
  let loopTimer = null;

  const timeline = [
    { id: 's1', duration: 3200 },
    { id: 's3', duration: 3000 },
    { id: 's5', duration: 2400 },
    { id: 's6', duration: 5000 }
  ];

  let currentIdx = 0;

  const renderStage = () => {
    const stage = timeline[currentIdx];

    if (stage.id === 's1') {
      phone.innerHTML = `
        <div class="tpda-notch"></div>
        <div class="tpda-bg-hearts" aria-hidden="true">
          <span class="tpda-bg-heart" style="left:15%;width:18px;height:18px;--dur:8s;--delay:0s;--rot:12deg;"><svg viewBox="0 0 32 32"><path d="M16 28C16 28 3 20 3 11.5C3 7 6.5 3.5 11 3.5C13.5 3.5 15.5 5 16 6.5C16.5 5 18.5 3.5 21 3.5C25.5 3.5 29 7 29 11.5C29 20 16 28 16 28Z" fill="#F57BA0"/></svg></span>
          <span class="tpda-bg-heart" style="left:75%;width:16px;height:16px;--dur:9s;--delay:1s;--rot:-15deg;"><svg viewBox="0 0 32 32"><path d="M16 28C16 28 3 20 3 11.5C3 7 6.5 3.5 11 3.5C13.5 3.5 15.5 5 16 6.5C16.5 5 18.5 3.5 21 3.5C25.5 3.5 29 7 29 11.5C29 20 16 28 16 28Z" fill="#F57BA0"/></svg></span>
        </div>
        <div class="tpda-screen tpda-s1">
          <div class="tpda-s1__kicker">1st anniversary</div>
          <h1 class="tpda-s1__title">Happy Anniversary,<span class="tpda-s1__name">my love</span></h1>
          <div class="tpda-s1__couple"><img src="assets/couple.webp" alt="Couple"/></div>
          <div class="tpda-s1__cd">
            <div class="tpda-s1__cd-label">Our day arrives in</div>
            <div class="tpda-s1__cd-row">
              <div class="tpda-s1__cd-cell"><span class="tpda-s1__cd-num">365</span><span class="tpda-s1__cd-unit">days</span></div>
              <span class="tpda-s1__cd-colon">·</span>
              <div class="tpda-s1__cd-cell"><span class="tpda-s1__cd-num">12</span><span class="tpda-s1__cd-unit">hrs</span></div>
              <span class="tpda-s1__cd-colon">·</span>
              <div class="tpda-s1__cd-cell"><span class="tpda-s1__cd-num">00</span><span class="tpda-s1__cd-unit">min</span></div>
            </div>
          </div>
          <p class="tpda-s1__question">Ready for a little surprise?</p>
          <div class="tpda-s1__actions">
            <span class="tpda-btn tpda-yes is-clicking">Yes</span>
            <span class="tpda-btn tpda-no">No</span>
          </div>
        </div>
        <div class="tpda-home-bar"></div>
      `;
    } else if (stage.id === 's3') {
      phone.innerHTML = `
        <div class="tpda-notch"></div>
        <div class="tpda-screen tpda-s3">
          <h4 class="tpda-s3__title">Love Meter</h4>
          <p class="tpda-s3__sub">Measuring our infinite bond</p>
          <div class="tpda-s3__meter-wrap is-full">
            <div class="tpda-s3__meter" style="width: 72px; height: 150px;">
              <div id="tpda-meter-fill" class="tpda-s3__fill" style="height: 10%; transition: height 1.8s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
              <div class="tpda-s3__center">
                <span id="tpda-pct-num" class="tpda-s3__pct">10%</span>
                <span style="font-size: 16px;">💖</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tpda-home-bar"></div>
      `;
      setTimeout(() => {
        const fill = document.getElementById('tpda-meter-fill');
        const num = document.getElementById('tpda-pct-num');
        if (fill) fill.style.height = '100%';
        if (num) num.textContent = '100%';
        fireConfetti(container);
      }, 200);
    } else if (stage.id === 's5') {
      phone.innerHTML = `
        <div class="tpda-notch"></div>
        <div class="tpda-screen tpda-s5 is-blown">
          <div class="tpda-s5__kicker">Sweet Celebration</div>
          <h3 class="tpda-s5__title">Make A Wish 🎂</h3>
          <div style="font-size: 4rem; text-align: center; margin-top: 2rem;">🎂✨</div>
        </div>
        <div class="tpda-home-bar"></div>
      `;
    } else if (stage.id === 's6') {
      phone.innerHTML = `
        <div class="tpda-notch"></div>
        <div class="tpda-screen tpda-s6">
          <h4 class="tpda-s6__title">A Love Letter</h4>
          <div class="tpda-s6__letter-card" style="box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
            <div class="tpda-s6__seal">💌</div>
            <p id="tpda-letter-txt" class="tpda-s6__letter-text"></p>
          </div>
        </div>
        <div class="tpda-home-bar"></div>
      `;
      typewriterEffect('tpda-letter-txt', "Dear my love,\n\nFrom the very first day, you have been my favorite chapter. Thank you for the small things — the smiles, the morning glances, and holding my hand.\n\nAlways yours 💕", 20);
    }

    loopTimer = setTimeout(() => {
      currentIdx = (currentIdx + 1) % timeline.length;
      renderStage();
    }, stage.duration);
  };

  renderStage();
}

/**
 * 3.6 FRIENDSHIP DAY AUTOPLAY
 */
function startFriendshipAutoplay() {
  const container = document.querySelector('.trending__preview--friendship');
  if (!container) return;

  const btn = container.querySelector('.fd-btn');
  const message = container.querySelector('.fd-message');
  if (!btn || !message) return;

  const quotes = [
    'Happy Friendship Day! 🫂',
    'To my partner in crime 💛',
    'Always got your back! ✨',
    'Best friends forever & always 💕'
  ];
  let qIdx = 0;

  setInterval(() => {
    qIdx = (qIdx + 1) % quotes.length;
    message.style.opacity = '0';
    message.style.transform = 'translateY(6px)';
    setTimeout(() => {
      message.textContent = quotes[qIdx];
      message.style.opacity = '1';
      message.style.transform = 'translateY(0)';
    }, 300);
  }, 3500);

  btn.addEventListener('click', () => {
    fireConfetti(container);
    message.textContent = 'Hugs & Love Sent! 🤗💛';
    btn.textContent = 'Bestie! ✨';
    setTimeout(() => {
      btn.textContent = 'Open Surprise 🎁';
    }, 2500);
  });
}

/* ==========================================================================
   4. TESTIMONIALS 3D COVERFLOW SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonials__slide');
  const dots = document.querySelectorAll('.testimonials__dot');
  if (!slides.length) return;

  let currentIndex = 0;
  const total = slides.length;

  const updateSlides = (index) => {
    currentIndex = (index + total) % total;

    slides.forEach((slide, i) => {
      slide.className = 'testimonials__slide';
      const diff = (i - currentIndex + total) % total;

      if (diff === 0) {
        slide.classList.add('testimonials__slide--center');
      } else if (diff === 1) {
        slide.classList.add('testimonials__slide--right');
      } else if (diff === total - 1) {
        slide.classList.add('testimonials__slide--left');
      } else if (diff > 1 && diff <= Math.floor(total / 2)) {
        slide.classList.add('testimonials__slide--hidden-right');
      } else {
        slide.classList.add('testimonials__slide--hidden-left');
      }
    });

    dots.forEach((dot, i) => {
      dot.className = i === currentIndex ? 'testimonials__dot testimonials__dot--active' : 'testimonials__dot';
    });
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlides(i));
  });

  slides.forEach((slide, i) => {
    slide.style.cursor = 'pointer';
    slide.addEventListener('click', () => {
      if (i !== currentIndex) updateSlides(i);
    });
  });

  let autoSlideTimer = setInterval(() => {
    updateSlides(currentIndex + 1);
  }, 4500);

  const track = document.querySelector('.testimonials__track');
  if (track) {
    track.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    track.addEventListener('mouseleave', () => {
      clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => updateSlides(currentIndex + 1), 4500);
    });
  }
}

/* ==========================================================================
   5. HOW IT WORKS MODAL
   ========================================================================== */
function initHowItWorksModal() {
  const cards = document.querySelectorAll('.how-it-works__card');
  if (!cards.length) return;

  const stepDetails = [
    { title: 'Step 1: Pick a Card', img: 'assets/pencil.svg', desc: 'Choose from our curated collection of interactive birthday, proposal, apology, anniversary, friendship and thank you cards.' },
    { title: 'Step 2: Add Your Love', img: 'assets/plan.svg', desc: 'Personalize the card with your favorite photos, secret inside jokes, cute messages, and interactive surprises.' },
    { title: 'Step 3: Send With Love', img: 'assets/target.svg', desc: 'Send your personalized card as a single link via WhatsApp, Instagram or SMS. No app download needed for them!' }
  ];

  cards.forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const step = stepDetails[idx] || stepDetails[0];
      const modal = document.createElement('div');
      modal.className = 'how-it-works__modal';
      modal.innerHTML = `
        <div class="how-it-works__modal-content" style="max-width: 440px; text-align: center; padding: 2.25rem; border-radius: 1.5rem;">
          <button class="how-it-works__modal-close">&times;</button>
          <img src="${step.img}" alt="${step.title}" style="width: 100px; height: 100px; margin: 0 auto 1.25rem;" />
          <h3 style="font-family: Poppins, sans-serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; color: #1a1a1a;">${step.title}</h3>
          <p style="font-family: Poppins, sans-serif; font-size: 0.95rem; line-height: 1.6; color: #555; margin-bottom: 1.75rem;">${step.desc}</p>
          <button class="hero__cta hero__cta--secondary" style="background: #efa7d6; color: #1a1a1a; border: none; padding: 0.75rem 2rem; border-radius: 999px; font-weight: 600;" onclick="this.closest('.how-it-works__modal').remove(); openStudio();">Try It Now ✨</button>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.how-it-works__modal-close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    });
  });
}

/* ==========================================================================
   6. WISHCARD STUDIO MODAL & FULLSCREEN PLAYER
   ========================================================================== */
function initCardStudioModal() {
  document.querySelectorAll('a[href*="create"], a.hero__cta, a.categories__bento-card, a.trending__cta, a.cta__button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && (href.startsWith('#') || href.includes('cards.html') || href.includes('about') || href.includes('instagram'))) {
        return;
      }
      e.preventDefault();

      let occasion = 'birthday';
      const text = btn.textContent.toLowerCase();
      if (text.includes('sorry') || (href && href.includes('sorry'))) occasion = 'sorry';
      else if (text.includes('proposal') || (href && href.includes('valentine'))) occasion = 'proposal';
      else if (text.includes('puzzle') || (href && href.includes('puzzle'))) occasion = 'puzzle';
      else if (text.includes('anniversary') || (href && href.includes('anniversary'))) occasion = 'anniversary';
      else if (text.includes('friendship') || (href && href.includes('friendship'))) occasion = 'friendship';
      else if (text.includes('thank') || (href && href.includes('thank'))) occasion = 'thank-you';

      openStudio(occasion);
    });
  });
}

window.openStudio = (initialOccasion = 'birthday') => {
  const existing = document.getElementById('card-studio-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'card-studio-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(26, 10, 26, 0.75);
    backdrop-filter: blur(10px);
    display: flex; justify-content: center; align-items: center;
    padding: 1rem; animation: fadeIn 0.25s ease;
  `;

  modal.innerHTML = `
    <div style="background: #fff; width: 100%; max-width: 520px; border-radius: 1.5rem; box-shadow: 0 25px 60px rgba(0,0,0,0.35); overflow: hidden; position: relative; font-family: 'Poppins', sans-serif;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #edc9e0 0%, #efa7d6 100%); padding: 1.5rem 1.75rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06);">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <img src="assets/logo.png" style="width: 28px; height: 28px; object-fit: contain;" alt="WishCard" />
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #1c1917;">WishCard Studio</h3>
        </div>
        <button id="studio-close" style="background: none; border: none; font-size: 1.75rem; color: #5a3a4e; cursor: pointer; line-height: 1;">&times;</button>
      </div>

      <!-- Form Body -->
      <div style="padding: 1.75rem; max-height: 80vh; overflow-y: auto;">
        <p style="margin: 0 0 1.25rem; font-size: 0.9rem; color: #666;">Craft a personalized interactive card you can send as a private link right away.</p>

        <!-- Occasion Select -->
        <label style="display: block; font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9b2a6e; margin-bottom: 0.4rem;">Select Occasion</label>
        <select id="studio-occasion" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.25rem; background: #fafafa; outline: none; font-family: inherit;">
          <option value="birthday" ${initialOccasion === 'birthday' ? 'selected' : ''}>🎂 Birthday Celebration</option>
          <option value="proposal" ${initialOccasion === 'proposal' ? 'selected' : ''}>💍 The Perfect Proposal</option>
          <option value="sorry" ${initialOccasion === 'sorry' ? 'selected' : ''}>🥺 Heartfelt Apology</option>
          <option value="anniversary" ${initialOccasion === 'anniversary' ? 'selected' : ''}>💑 Anniversary Special</option>
          <option value="friendship" ${initialOccasion === 'friendship' ? 'selected' : ''}>🫂 Friendship Day Card</option>
          <option value="thank-you" ${initialOccasion === 'thank-you' ? 'selected' : ''}>💐 Thank You Letter</option>
        </select>

        <!-- Recipient Name -->
        <label style="display: block; font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9b2a6e; margin-bottom: 0.4rem;">Recipient's Name</label>
        <input id="studio-to" type="text" placeholder="e.g. Divya, Sarah, My Love" value="Divya" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.25rem; box-sizing: border-box; outline: none; font-family: inherit;" />

        <!-- Sender Name -->
        <label style="display: block; font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9b2a6e; margin-bottom: 0.4rem;">Your Name</label>
        <input id="studio-from" type="text" placeholder="e.g. Mahmud" value="Someone Special" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.25rem; box-sizing: border-box; outline: none; font-family: inherit;" />

        <!-- Personal Message -->
        <label style="display: block; font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9b2a6e; margin-bottom: 0.4rem;">Heartfelt Message</label>
        <textarea id="studio-msg" rows="3" placeholder="Write your heartfelt note here..." style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.5rem; box-sizing: border-box; outline: none; resize: vertical; font-family: inherit;">You bring so much sunshine and joy into my life. Every day is magical with you!</textarea>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.75rem;">
          <button id="studio-play-btn" style="flex: 1; background: linear-gradient(135deg, #e91e8c, #c026d3); color: #fff; border: none; border-radius: 0.875rem; padding: 0.85rem; font-weight: 600; font-size: 1rem; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 14px rgba(233,30,140,0.35);">
            Play Card 🎁
          </button>
          <button id="studio-share-btn" style="flex: 1; background: #faf0f5; color: #9b2a6e; border: 1.5px solid #f2a6cd; border-radius: 0.875rem; padding: 0.85rem; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s;">
            Copy Link 🔗
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#studio-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Share Link Action
  modal.querySelector('#studio-share-btn').addEventListener('click', () => {
    const to = encodeURIComponent(modal.querySelector('#studio-to').value.trim() || 'You');
    const occasion = modal.querySelector('#studio-occasion').value;
    const shareUrl = `${window.location.origin}${window.location.pathname}?card=${occasion}&to=${to}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('✨ Private card link copied to clipboard! Share it anywhere.');
    }).catch(() => {
      showToast('✨ Card ready! URL: ' + shareUrl);
    });
  });

  // Play Live Card Action
  modal.querySelector('#studio-play-btn').addEventListener('click', () => {
    const to = modal.querySelector('#studio-to').value.trim() || 'You';
    const from = modal.querySelector('#studio-from').value.trim() || 'Someone';
    const msg = modal.querySelector('#studio-msg').value.trim();
    const occasion = modal.querySelector('#studio-occasion').value;

    modal.remove();
    playFullscreenCard(occasion, to, from, msg);
  });
};

function playFullscreenCard(occasion, to, from, msg) {
  const player = document.createElement('div');
  player.id = 'fullscreen-card-player';
  player.style.cssText = `
    position: fixed; inset: 0; z-index: 10000;
    background: radial-gradient(circle at center, #2d0a2d 0%, #150518 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    padding: 1.5rem; animation: fadeIn 0.3s ease;
  `;

  player.innerHTML = `
    <button onclick="this.closest('#fullscreen-card-player').remove()" style="position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.2); border: none; color: #fff; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);">&times;</button>

    <div style="width: 100%; max-width: 380px; height: 580px; background: #fff; border-radius: 2rem; box-shadow: 0 30px 80px rgba(0,0,0,0.5); overflow: hidden; position: relative; display: flex; flex-direction: column; font-family: 'Poppins', sans-serif;">
      <div style="background: #fdf2f8; padding: 0.75rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <span style="font-size: 0.8rem; font-weight: 600; color: #9b2a6e;">WishCard Surprise</span>
        <span style="font-size: 0.8rem; color: #999;">Just now</span>
      </div>

      <div id="player-stage" style="flex: 1; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: linear-gradient(180deg, #fff 0%, #fff0f5 100%);">
        <span style="font-size: 4rem; margin-bottom: 1rem; animation: floatBounce 2s ease infinite;">🎁</span>
        <h2 style="font-family: 'Playfair Display', serif; color: #9b2a6e; font-size: 1.8rem; margin: 0 0 0.5rem;">For ${to}</h2>
        <p style="color: #666; font-size: 0.95rem; margin-bottom: 1.5rem;">A special surprise prepared with all my love.</p>
        <button id="player-open-btn" style="background: linear-gradient(135deg, #e91e8c, #c026d3); color: #fff; border: none; border-radius: 999px; padding: 0.8rem 2rem; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 6px 20px rgba(233,30,140,0.4);">
          Tap to Open ✨
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(player);

  player.querySelector('#player-open-btn').addEventListener('click', () => {
    fireConfetti(player);
    const stage = player.querySelector('#player-stage');

    stage.innerHTML = `
      <div style="animation: noteAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; width: 100%;">
        <span style="font-size: 3rem; margin-bottom: 0.5rem; display: block;">💖🎂✨</span>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #8a0f36; margin: 0 0 0.5rem;">Dearest ${to},</h3>
        <div style="background: #fff; border: 1.5px solid #fce7f3; border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.25rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left;">
          <p style="font-family: 'Caveat', cursive; font-size: 1.2rem; color: #4a2835; line-height: 1.5; margin: 0;">${msg}</p>
        </div>
        <p style="font-size: 0.9rem; color: #9b2a6e; font-weight: 600; margin: 0 0 1.25rem;">With all my love,<br><span style="font-family: 'Caveat', cursive; font-size: 1.3rem;">${from}</span></p>
        <button onclick="this.closest('#fullscreen-card-player').remove()" style="background: #fdf2f8; border: 1.5px solid #f472b6; color: #be185d; border-radius: 999px; padding: 0.6rem 1.5rem; font-size: 0.85rem; font-weight: 600; cursor: pointer;">Close Card ❤️</button>
      </div>
    `;
  });
}

/* ==========================================================================
   7. HELPER UTILITIES: TOAST, TYPEWRITER, CONFETTI
   ========================================================================== */
function showToast(message) {
  const existing = document.querySelector('.hc-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'hc-toast';
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: #1c1917; color: #fff; padding: 0.75rem 1.5rem;
    border-radius: 999px; font-family: 'Poppins', sans-serif; font-size: 0.875rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.25); z-index: 10001; animation: fadeIn 0.2s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function typewriterEffect(elementId, text, speed = 25) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

/* Canvas Confetti Explosion */
let confettiCanvas = null;
let confettiCtx = null;
let particles = [];

function initConfetti() {
  confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
  document.body.appendChild(confettiCanvas);
  confettiCtx = confettiCanvas.getContext('2d');

  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function fireConfetti(targetElem) {
  if (!confettiCanvas) initConfetti();

  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;

  if (targetElem) {
    const rect = targetElem.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
  }

  const colors = ['#ff4757', '#ff6b81', '#ffa502', '#2ed573', '#1e90ff', '#e056fd', '#f06292'];
  for (let i = 0; i < 45; i++) {
    particles.push({
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  if (particles.length <= 45) {
    requestAnimationFrame(renderConfetti);
  }
}

function renderConfetti() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.25;
    p.alpha -= 0.015;
    p.rotation += p.vRot;

    confettiCtx.save();
    confettiCtx.globalAlpha = Math.max(p.alpha, 0);
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    confettiCtx.restore();

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  if (particles.length > 0) {
    requestAnimationFrame(renderConfetti);
  } else {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}
