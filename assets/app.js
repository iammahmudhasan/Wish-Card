/**
 * WishCard - Complete Interactive & Animation Engine
 * Reverse-Engineered from Production & Enhanced with Full Autoplay State Machines
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof checkAndRenderSharedCard === 'function' && checkAndRenderSharedCard()) return;
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

/* ==========================================================================
   SOUND FX SYNTHESIZER (Pure Web Audio API - Self-Contained)
   ========================================================================== */
const SoundFX = {
  ctx: null,
  enabled: true,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  },
  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        const t = this.ctx.currentTime + (idx * 0.09);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.22, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.start(t);
        osc.stop(t + 0.5);
      });
    } catch (e) {}
  },
  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        const t = this.ctx.currentTime + (idx * 0.12);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        osc.start(t);
        osc.stop(t + 0.9);
      });
    } catch (e) {}
  },
  playPuff() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const bufSize = Math.floor(this.ctx.sampleRate * 0.25);
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.25);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();
    } catch (e) {}
  }
};

/* ==========================================================================
   SHARED CARD URL PARSER & RECIPIENT ROUTER
   ========================================================================== */
function parseCardDataFromURL() {
  const params = new URLSearchParams(window.location.search);
  let card = params.get('card') || params.get('c');
  let to = params.get('to');
  let from = params.get('from');
  let msg = params.get('msg') || params.get('message');
  const w = params.get('w') || params.get('data');

  if (w) {
    try {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(w))));
      if (decoded.card) card = decoded.card;
      if (decoded.to) to = decoded.to;
      if (decoded.from) from = decoded.from;
      if (decoded.msg) msg = decoded.msg;
    } catch (e) {
      console.warn('Could not decode payload:', e);
    }
  }

  if (to || card) {
    return {
      card: card || 'birthday',
      to: to || 'Friend',
      from: from || 'Someone Special',
      msg: msg || 'You bring so much sunshine and joy into my life. Every day is magical with you!'
    };
  }
  return null;
}

function checkAndRenderSharedCard() {
  const data = parseCardDataFromURL();
  if (data) {
    document.title = `${data.to}, you have a special surprise from ${data.from}! ✨ | WishCard`;
    document.body.style.overflow = 'hidden';
    
    // Hide all base page content so recipient sees only the dedicated card viewport
    document.querySelectorAll('body > *').forEach(el => {
      if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
        el.style.display = 'none';
      }
    });

    renderRecipientExperience(data, false);
    return true;
  }
  return false;
}

/* ==========================================================================
   DEDICATED RECIPIENT CARD EXPERIENCE (FULLSCREEN INTERACTIVE VIEWPORT)
   ========================================================================== */
function renderRecipientExperience(data, isPreview = false) {
  const existing = document.getElementById('wishcard-recipient-viewport');
  if (existing) existing.remove();

  const viewport = document.createElement('div');
  viewport.id = 'wishcard-recipient-viewport';
  viewport.style.cssText = `
    position: fixed; inset: 0; z-index: 100000;
    background: radial-gradient(circle at 50% 20%, #ffeef6 0%, #ffd6e7 45%, #fce4ec 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    overflow-y: auto; overflow-x: hidden; font-family: 'Poppins', sans-serif;
    padding: 1rem; box-sizing: border-box;
  `;

  if (!document.getElementById('wishcard-recipient-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'wishcard-recipient-styles';
    styleEl.innerHTML = `
      @keyframes floatBalloon {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-14px) rotate(3deg); }
      }
      @keyframes flameGlow {
        0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.95; }
        50% { transform: scale(1.18) rotate(2deg); opacity: 1; filter: drop-shadow(0 0 10px #ff9800); }
      }
      @keyframes puffFade {
        0% { transform: translateY(0) scale(1); opacity: 0.8; }
        100% { transform: translateY(-30px) scale(2.2); opacity: 0; }
      }
      @keyframes bounceIn {
        0% { transform: scale(0.65); opacity: 0; }
        70% { transform: scale(1.06); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes popOut {
        0% { transform: scale(1); opacity: 1; }
        40% { transform: scale(1.3); opacity: 0.8; }
        100% { transform: scale(0); opacity: 0; }
      }
      @keyframes letterScroll {
        0% { transform: translateY(30px) scale(0.92); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      .interactive-balloon {
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .interactive-balloon:hover {
        transform: scale(1.1) !important;
        filter: brightness(1.08);
      }
      .interactive-balloon:active {
        transform: scale(0.92) !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  const { to, from, msg, card } = data;

  // Top Bar
  const topBar = document.createElement('div');
  topBar.style.cssText = `
    position: absolute; top: 1rem; left: 1rem; right: 1rem;
    display: flex; justify-content: space-between; align-items: center;
    z-index: 10;
  `;
  topBar.innerHTML = `
    <a href="/" style="display: flex; align-items: center; gap: 0.45rem; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); padding: 0.45rem 0.95rem; border-radius: 999px; text-decoration: none; color: #9b2a6e; font-size: 0.85rem; font-weight: 700; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
      <img src="assets/logo.png" style="width: 22px; height: 22px; object-fit: contain;" alt="WishCard" />
      <span>WishCard</span>
    </a>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <button id="rcp-sound-btn" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border: none; padding: 0.45rem 0.85rem; border-radius: 999px; cursor: pointer; color: #9b2a6e; font-size: 0.825rem; font-weight: 600; display: flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <span>🔊</span> Sound ON
      </button>
      ${isPreview ? `
        <button id="rcp-close-btn" title="Close Preview" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; color: #666; font-size: 1.35rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">&times;</button>
      ` : ''}
    </div>
  `;
  viewport.appendChild(topBar);

  const soundBtn = topBar.querySelector('#rcp-sound-btn');
  soundBtn.addEventListener('click', () => {
    SoundFX.enabled = !SoundFX.enabled;
    soundBtn.innerHTML = SoundFX.enabled ? '<span>🔊</span> Sound ON' : '<span>🔇</span> Muted';
  });

  if (isPreview) {
    topBar.querySelector('#rcp-close-btn').addEventListener('click', () => {
      viewport.remove();
    });
  }

  // Card Content Stage Box
  const stageBox = document.createElement('div');
  stageBox.id = 'rcp-stage-container';
  stageBox.style.cssText = `
    width: 100%; max-width: 440px; min-height: 560px;
    background: #ffffff; border-radius: 2rem;
    box-shadow: 0 25px 60px rgba(155, 42, 110, 0.2), 0 10px 20px rgba(0,0,0,0.06);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 2rem 1.75rem; box-sizing: border-box;
    text-align: center; margin: auto; animation: bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  viewport.appendChild(stageBox);
  document.body.appendChild(viewport);

  // Route to the appropriate occasion flow
  if (card === 'birthday') {
    renderBirthdayFlow(stageBox, to, from, msg);
  } else if (card === 'proposal' || card === 'valentine') {
    renderProposalFlow(stageBox, to, from, msg);
  } else if (card === 'sorry') {
    renderSorryFlow(stageBox, to, from, msg);
  } else {
    renderGeneralCardFlow(stageBox, to, from, msg, card);
  }
}

/* ==========================================================================
   1. BIRTHDAY INTERACTIVE FLOW (DELIVERY -> BALLOONS -> CAKE -> LETTER)
   ========================================================================== */
function renderBirthdayFlow(container, to, from, msg) {
  // STAGE 1: Sealed Delivery Box
  container.innerHTML = `
    <div style="animation: bounceIn 0.5s ease; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div style="font-size: 5rem; line-height: 1; margin-bottom: 1.25rem; animation: floatBalloon 3s ease-in-out infinite; filter: drop-shadow(0 10px 15px rgba(233,30,140,0.25)); cursor: pointer;" id="stage1-box">
        🎁
      </div>
      <div style="background: #fdf2f8; border: 1.5px dashed #f472b6; border-radius: 1rem; padding: 0.6rem 1.25rem; margin-bottom: 1rem; display: inline-block;">
        <span style="font-size: 0.85rem; color: #be185d; font-weight: 600;">💌 From: <b>${from}</b></span>
      </div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.85rem; color: #831843; margin: 0 0 0.5rem; line-height: 1.2;">
        A Special Birthday Surprise!
      </h2>
      <p style="color: #6b7280; font-size: 0.95rem; margin: 0 0 1.75rem; max-width: 320px;">
        For <b>${to}</b> with all my heart. Tap below to begin your celebration!
      </p>
      <button id="bday-step1-btn" style="background: linear-gradient(135deg, #e91e8c, #c026d3); color: #fff; border: none; border-radius: 999px; padding: 0.9rem 2.25rem; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgba(233,30,140,0.4); transition: transform 0.2s;">
        Tap to Open Surprise ✨
      </button>
    </div>
  `;

  const boxBtn = container.querySelector('#bday-step1-btn');
  const giftBox = container.querySelector('#stage1-box');
  const triggerNext = () => {
    SoundFX.playChime();
    fireConfetti(container);
    startBirthdayBalloonStage(container, to, from, msg);
  };
  boxBtn.addEventListener('click', triggerNext);
  giftBox.addEventListener('click', triggerNext);
}

function startBirthdayBalloonStage(container, to, from, msg) {
  // STAGE 2: Interactive Balloon Pop Challenge
  container.innerHTML = `
    <div style="animation: bounceIn 0.4s ease; width: 100%;">
      <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #db2777; letter-spacing: 0.05em; display: block; margin-bottom: 0.4rem;">
        Birthday Challenge 🎈
      </span>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; color: #831843; margin: 0 0 0.4rem;">
        Pop all balloons, ${to}!
      </h2>
      <p id="bday-balloon-hint" style="color: #6b7280; font-size: 0.9rem; margin: 0 0 1.5rem;">
        Tap each balloon to release your wishes (4 remaining)
      </p>

      <div id="balloon-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 280px; margin: 0 auto 1.5rem;">
        <div class="interactive-balloon" data-idx="1" style="background: linear-gradient(135deg, #ff9a9e, #fecfef); border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(255,154,158,0.45); animation: floatBalloon 3s ease-in-out infinite;">
          <span style="font-size: 2.25rem;">🎈</span>
          <span style="font-size: 0.75rem; font-weight: 700; color: #881337;">Love</span>
        </div>
        <div class="interactive-balloon" data-idx="2" style="background: linear-gradient(135deg, #fbc2eb, #a6c1ee); border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(166,193,238,0.45); animation: floatBalloon 3.3s ease-in-out infinite 0.3s;">
          <span style="font-size: 2.25rem;">🎂</span>
          <span style="font-size: 0.75rem; font-weight: 700; color: #4c1d95;">Joy</span>
        </div>
        <div class="interactive-balloon" data-idx="3" style="background: linear-gradient(135deg, #f6d365, #fda085); border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(253,160,133,0.45); animation: floatBalloon 2.8s ease-in-out infinite 0.6s;">
          <span style="font-size: 2.25rem;">🌟</span>
          <span style="font-size: 0.75rem; font-weight: 700; color: #78350f;">Success</span>
        </div>
        <div class="interactive-balloon" data-idx="4" style="background: linear-gradient(135deg, #84fab0, #8fd3f4); border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(143,211,244,0.45); animation: floatBalloon 3.5s ease-in-out infinite 0.9s;">
          <span style="font-size: 2.25rem;">✨</span>
          <span style="font-size: 0.75rem; font-weight: 700; color: #14532d;">Smile</span>
        </div>
      </div>
    </div>
  `;

  let remaining = 4;
  const hintEl = container.querySelector('#bday-balloon-hint');
  const balloons = container.querySelectorAll('.interactive-balloon');

  balloons.forEach(b => {
    b.addEventListener('click', () => {
      if (b.dataset.popped) return;
      b.dataset.popped = 'true';

      SoundFX.playPop();
      fireConfetti(b);

      b.style.animation = 'popOut 0.25s forwards';
      remaining--;

      if (remaining > 0) {
        hintEl.textContent = `Great! Tap each balloon to release your wishes (${remaining} remaining)`;
      } else {
        hintEl.textContent = `🎉 Woohoo! All balloons popped! Bringing your cake...`;
        SoundFX.playFanfare();
        setTimeout(() => {
          startBirthdayCakeStage(container, to, from, msg);
        }, 800);
      }
    });
  });
}

function startBirthdayCakeStage(container, to, from, msg) {
  // STAGE 3: Cake & Candle Blow
  container.innerHTML = `
    <div style="animation: bounceIn 0.4s ease; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #db2777; letter-spacing: 0.05em; display: block; margin-bottom: 0.3rem;">
        Make A Wish 🕯️
      </span>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; color: #831843; margin: 0 0 1rem;">
        Blow out your candle, ${to}!
      </h2>

      <!-- Cake Artwork -->
      <div style="position: relative; width: 160px; height: 160px; margin: 0 auto 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;" id="candle-cake-wrap">
        <div id="candle-flame" style="font-size: 2rem; position: absolute; top: 10px; animation: flameGlow 0.8s infinite ease-in-out; transition: all 0.3s;">
          🔥
        </div>
        <div style="width: 14px; height: 35px; background: repeating-linear-gradient(45deg, #f43f5e, #f43f5e 4px, #ffffff 4px, #ffffff 8px); border-radius: 4px; position: absolute; top: 38px;"></div>
        <div style="font-size: 5.5rem; line-height: 1; margin-top: 55px;" id="bday-cake-art">
          🎂
        </div>
      </div>

      <p id="cake-prompt-text" style="color: #6b7280; font-size: 0.95rem; margin: 0 0 1.5rem; max-width: 300px;">
        Close your eyes, make a secret wish, and blow out the candle!
      </p>

      <button id="blow-candle-btn" style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: #fff; border: none; border-radius: 999px; padding: 0.85rem 2rem; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgba(245,158,11,0.4); transition: transform 0.2s;">
        Blow Candle 🕯️💨
      </button>
    </div>
  `;

  const blowBtn = container.querySelector('#blow-candle-btn');
  const flame = container.querySelector('#candle-flame');
  const cakeWrap = container.querySelector('#candle-cake-wrap');
  const promptText = container.querySelector('#cake-prompt-text');

  let blown = false;

  const handleBlow = () => {
    if (blown) return;
    blown = true;

    SoundFX.playPuff();
    flame.style.animation = 'puffFade 0.6s forwards';

    setTimeout(() => {
      flame.innerHTML = '💨';
      promptText.innerHTML = `🌟 <b>Wish Made!</b> Now cut your cake and open your letter!`;
      blowBtn.textContent = 'Cut Birthday Cake 🍰';
      blowBtn.style.background = 'linear-gradient(135deg, #e91e8c, #c026d3)';
      blowBtn.style.boxShadow = '0 8px 24px rgba(233,30,140,0.4)';

      blowBtn.onclick = () => {
        SoundFX.playFanfare();
        fireConfetti(container);
        startLetterRevealStage(container, to, from, msg, 'birthday');
      };
    }, 400);
  };

  blowBtn.addEventListener('click', handleBlow);
  cakeWrap.addEventListener('click', handleBlow);
}

function startLetterRevealStage(container, to, from, msg, occasion) {
  // STAGE 4: Heartfelt Handwritten Letter
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  container.innerHTML = `
    <div style="animation: letterScroll 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); width: 100%; display: flex; flex-direction: column; align-items: center;">
      <span style="font-size: 2.5rem; margin-bottom: 0.25rem;">💌</span>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.7rem; color: #831843; margin: 0 0 0.25rem;">
        Happy Birthday, ${to}! 🎂
      </h2>
      <span style="font-size: 0.8rem; color: #9ca3af; margin-bottom: 1rem;">${today}</span>

      <!-- Letter Body -->
      <div style="background: #fffdfa; border: 1.5px solid #fce7f3; border-radius: 1.25rem; padding: 1.5rem; width: 100%; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.06); text-align: left; margin-bottom: 1.5rem; position: relative;">
        <div style="font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #9d174d; margin-bottom: 0.75rem;">
          Dearest ${to},
        </div>
        <p id="letter-msg-body" style="font-family: 'Caveat', cursive, sans-serif; font-size: 1.35rem; color: #374151; line-height: 1.6; margin: 0 0 1rem; min-height: 70px;">
          ${msg}
        </p>
        <div style="text-align: right; border-top: 1px dashed #fce7f3; padding-top: 0.75rem;">
          <span style="font-size: 0.85rem; color: #9ca3af;">With all my love & wishes,</span><br/>
          <span style="font-family: 'Caveat', cursive, sans-serif; font-size: 1.5rem; font-weight: 700; color: #be185d;">~ ${from} ❤️</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: 0.65rem; width: 100%;">
        <a id="thank-wa-btn" href="https://api.whatsapp.com/send?text=${encodeURIComponent(`Thank you so much ${from} for the beautiful WishCard birthday surprise! ❤️ I loved it!`)}" target="_blank" rel="noopener noreferrer" style="background: #25D366; color: #fff; text-decoration: none; border-radius: 999px; padding: 0.75rem 1rem; font-size: 0.925rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 14px rgba(37,211,102,0.35);">
          <span>💬</span> Say Thanks to ${from} on WhatsApp
        </a>
        <div style="display: flex; gap: 0.5rem; width: 100%;">
          <button id="replay-btn" style="flex: 1; background: #fdf2f8; border: 1.5px solid #f472b6; color: #be185d; border-radius: 999px; padding: 0.7rem; font-size: 0.875rem; font-weight: 600; cursor: pointer;">
            Replay 🔄
          </button>
          <a href="/" style="flex: 1; background: #fafafa; border: 1.5px solid #e5e7eb; color: #4b5563; text-decoration: none; border-radius: 999px; padding: 0.7rem; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; justify-content: center;">
            Make a Card 💖
          </a>
        </div>
      </div>
    </div>
  `;

  fireConfetti(container);
  container.querySelector('#replay-btn').addEventListener('click', () => {
    renderBirthdayFlow(container, to, from, msg);
  });
}

/* ==========================================================================
   2. PROPOSAL FLOW (RUNAWAY "NO" BUTTON -> "YES" -> CONFETTI LOVE LETTER)
   ========================================================================== */
function renderProposalFlow(container, to, from, msg) {
  let yesScale = 1;
  const dodges = [
    '"No" seems a bit shy! 🙈',
    'Are you really sure? 🥺',
    'Think again! 😜',
    'Error 404: "No" not found! 😂',
    'You cannot reject this love! 💘',
    'Only "Yes" is accepted! 💍'
  ];
  let dodgeIdx = 0;

  container.innerHTML = `
    <div style="animation: bounceIn 0.5s ease; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div style="font-size: 4.5rem; margin-bottom: 0.75rem; animation: floatBalloon 3s infinite ease-in-out;">
        💑
      </div>
      <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #e11d48; letter-spacing: 0.05em; display: block; margin-bottom: 0.4rem;">
        The Big Question 💍
      </span>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.75rem; color: #881337; margin: 0 0 1rem; line-height: 1.3;">
        ${to}, will you be forever mine?
      </h2>
      <p id="prop-hint" style="color: #6b7280; font-size: 0.95rem; margin: 0 0 1.75rem; min-height: 24px;">
        Choose your answer carefully... ❤️
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center; align-items: center; width: 100%; position: relative; height: 110px;">
        <button id="prop-yes-btn" style="background: linear-gradient(135deg, #e11d48, #be123c); color: #fff; border: none; border-radius: 999px; padding: 0.9rem 2.25rem; font-size: 1.1rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgba(225,29,72,0.4); transform: scale(${yesScale}); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 5;">
          Yes! 💖
        </button>
        <button id="prop-no-btn" style="background: #f3f4f6; color: #4b5563; border: 1.5px solid #d1d5db; border-radius: 999px; padding: 0.85rem 1.75rem; font-size: 0.95rem; font-weight: 600; cursor: pointer; position: relative; transition: all 0.2s ease;">
          No 🙈
        </button>
      </div>
    </div>
  `;

  const yesBtn = container.querySelector('#prop-yes-btn');
  const noBtn = container.querySelector('#prop-no-btn');
  const hintEl = container.querySelector('#prop-hint');

  const dodgeNo = (e) => {
    if (e) e.preventDefault();
    SoundFX.playPop();

    const maxX = 120;
    const maxY = 45;
    const randX = (Math.random() - 0.5) * maxX * 2;
    const randY = (Math.random() - 0.5) * maxY * 2;

    noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
    hintEl.textContent = dodges[dodgeIdx % dodges.length];
    dodgeIdx++;

    yesScale = Math.min(yesScale + 0.15, 1.7);
    yesBtn.style.transform = `scale(${yesScale})`;
  };

  noBtn.addEventListener('mouseenter', dodgeNo);
  noBtn.addEventListener('click', dodgeNo);
  noBtn.addEventListener('touchstart', dodgeNo);

  yesBtn.addEventListener('click', () => {
    SoundFX.playFanfare();
    fireConfetti(container);
    startLetterRevealStage(container, to, from, msg, 'proposal');
  });
}

/* ==========================================================================
   3. SORRY / APOLOGY FLOW (FORGIVENESS METER -> APOLOGY LETTER)
   ========================================================================== */
function renderSorryFlow(container, to, from, msg) {
  let meter = 0;
  const stages = [
    { pct: 0, text: 'Tap the button to send forgiveness ❤️', mood: '🥺' },
    { pct: 25, text: 'Heart warming up a little... 🥹', mood: '🥺' },
    { pct: 50, text: 'Feeling much better now... 🌸', mood: '☺️' },
    { pct: 75, text: 'Almost completely forgiven! 💖', mood: '🥰' },
    { pct: 100, text: '100% Forgiven! Yay! 🎉', mood: '🥳' },
    { pct: 120, text: 'BONUS LOVE & HUGS UNLOCKED! 🤗', mood: '💖' }
  ];
  let stageIndex = 0;

  container.innerHTML = `
    <div style="animation: bounceIn 0.5s ease; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div id="sorry-mood" style="font-size: 5rem; margin-bottom: 0.75rem; animation: floatBalloon 3s infinite ease-in-out;">
        🥺
      </div>
      <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #ea580c; letter-spacing: 0.05em; display: block; margin-bottom: 0.4rem;">
        Heartfelt Apology 🙏
      </span>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.75rem; color: #9a3412; margin: 0 0 0.5rem;">
        I am so sorry, ${to}
      </h2>
      <p id="sorry-stage-desc" style="color: #6b7280; font-size: 0.925rem; margin: 0 0 1.25rem;">
        Tap below to send forgiveness ❤️
      </p>

      <!-- Forgiveness Meter Bar -->
      <div style="width: 100%; max-width: 280px; background: #fee2e2; border-radius: 999px; height: 20px; overflow: hidden; margin-bottom: 1.5rem; border: 1.5px solid #fca5a5;">
        <div id="sorry-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #f43f5e, #fb7185); border-radius: 999px; transition: width 0.3s ease;"></div>
      </div>

      <button id="sorry-tap-btn" style="background: linear-gradient(135deg, #f43f5e, #e11d48); color: #fff; border: none; border-radius: 999px; padding: 0.9rem 2.25rem; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgba(244,63,94,0.4); transition: transform 0.2s;">
        Send Forgiveness ❤️
      </button>
    </div>
  `;

  const tapBtn = container.querySelector('#sorry-tap-btn');
  const bar = container.querySelector('#sorry-progress');
  const moodEl = container.querySelector('#sorry-mood');
  const descEl = container.querySelector('#sorry-stage-desc');

  tapBtn.addEventListener('click', () => {
    SoundFX.playPop();
    fireConfetti(tapBtn);

    stageIndex = Math.min(stageIndex + 1, stages.length - 1);
    const curr = stages[stageIndex];

    bar.style.width = `${Math.min(curr.pct, 100)}%`;
    moodEl.textContent = curr.mood;
    descEl.textContent = curr.text;

    if (curr.pct >= 100) {
      tapBtn.textContent = 'Read Apology Letter 💌';
      tapBtn.onclick = () => {
        SoundFX.playFanfare();
        startLetterRevealStage(container, to, from, msg, 'sorry');
      };
    }
  });
}

/* ==========================================================================
   4. GENERAL CARD FLOW (ANNIVERSARY, FRIENDSHIP, THANK YOU, PUZZLE)
   ========================================================================== */
function renderGeneralCardFlow(container, to, from, msg, occasion) {
  const iconMap = {
    'anniversary': '💍',
    'friendship': '🫂',
    'thank-you': '💐',
    'puzzle': '🧩'
  };
  const icon = iconMap[occasion] || '✨';

  container.innerHTML = `
    <div style="animation: bounceIn 0.5s ease; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div style="font-size: 5rem; margin-bottom: 1rem; animation: floatBalloon 3s infinite ease-in-out;">
        ${icon}
      </div>
      <div style="background: #fdf2f8; border: 1.5px dashed #f472b6; border-radius: 1rem; padding: 0.5rem 1.25rem; margin-bottom: 1rem;">
        <span style="font-size: 0.85rem; color: #be185d; font-weight: 600;">💌 From: <b>${from}</b></span>
      </div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 1.85rem; color: #831843; margin: 0 0 0.5rem; line-height: 1.2;">
        A Special Surprise for ${to}!
      </h2>
      <p style="color: #6b7280; font-size: 0.95rem; margin: 0 0 1.75rem; max-width: 320px;">
        Tap below to reveal the interactive surprise made just for you.
      </p>
      <button id="gen-open-btn" style="background: linear-gradient(135deg, #e91e8c, #c026d3); color: #fff; border: none; border-radius: 999px; padding: 0.9rem 2.25rem; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgba(233,30,140,0.4); transition: transform 0.2s;">
        Open Surprise ✨
      </button>
    </div>
  `;

  container.querySelector('#gen-open-btn').addEventListener('click', () => {
    SoundFX.playFanfare();
    fireConfetti(container);
    startLetterRevealStage(container, to, from, msg, occasion);
  });
}

/* ==========================================================================
   WISHCARD STUDIO MODAL & ENHANCED LINK SHARING
   ========================================================================== */
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
      <div id="studio-body" style="padding: 1.75rem; max-height: 80vh; overflow-y: auto;">
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
        <input id="studio-to" type="text" placeholder="e.g. Mahmud, Sarah, My Love" value="Mahmud" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.25rem; box-sizing: border-box; outline: none; font-family: inherit;" />

        <!-- Sender Name -->
        <label style="display: block; font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9b2a6e; margin-bottom: 0.4rem;">Your Name</label>
        <input id="studio-from" type="text" placeholder="e.g. Fahim" value="Fahim" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.25rem; box-sizing: border-box; outline: none; font-family: inherit;" />

        <!-- Personal Message -->
        <label style="display: block; font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9b2a6e; margin-bottom: 0.4rem;">Heartfelt Message</label>
        <textarea id="studio-msg" rows="3" placeholder="Write your heartfelt note here..." style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.95rem; margin-bottom: 1.5rem; box-sizing: border-box; outline: none; resize: vertical; font-family: inherit;">You bring so much sunshine and joy into my life. Every day is magical with you!</textarea>

        <!-- Action Buttons -->
        <div id="studio-actions-row" style="display: flex; gap: 0.75rem;">
          <button id="studio-play-btn" style="flex: 1; background: linear-gradient(135deg, #e91e8c, #c026d3); color: #fff; border: none; border-radius: 0.875rem; padding: 0.85rem; font-weight: 600; font-size: 1rem; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 14px rgba(233,30,140,0.35);">
            Play Card 🎁
          </button>
          <button id="studio-share-btn" style="flex: 1; background: #faf0f5; color: #9b2a6e; border: 1.5px solid #f2a6cd; border-radius: 0.875rem; padding: 0.85rem; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s;">
            Copy Link 🔗
          </button>
        </div>

        <!-- Success Share Box (Initially Hidden) -->
        <div id="studio-share-box" style="display: none; margin-top: 1.25rem; background: #fdf2f8; border: 1.5px solid #fbcfe8; border-radius: 1rem; padding: 1.25rem; text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 0.35rem; background: #dcfce7; color: #166534; font-size: 0.85rem; font-weight: 700; padding: 0.35rem 0.85rem; border-radius: 999px; margin-bottom: 0.75rem;">
            ✓ Link Copied to Clipboard!
          </div>
          <p style="font-size: 0.875rem; color: #4b5563; margin: 0 0 1rem;">
            Give this link to your recipient. They will open a dedicated interactive card made just for them!
          </p>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <input id="studio-share-url" type="text" readonly style="flex: 1; background: #fff; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.6rem 0.8rem; font-size: 0.85rem; color: #374151; font-family: monospace;" />
            <button id="studio-recopy-btn" style="background: #9b2a6e; color: #fff; border: none; border-radius: 0.5rem; padding: 0.6rem 1rem; font-size: 0.85rem; font-weight: 600; cursor: pointer;">
              Copy
            </button>
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <a id="studio-wa-btn" href="#" target="_blank" rel="noopener noreferrer" style="flex: 1; background: #25D366; color: #fff; text-decoration: none; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 4px 12px rgba(37,211,102,0.3);">
              <span>📲</span> Share on WhatsApp
            </a>
            <button id="studio-test-btn" style="flex: 1; background: #be185d; color: #fff; border: none; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(190,24,93,0.3);">
              Open Preview 👀
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#studio-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  const getCardData = () => {
    const to = modal.querySelector('#studio-to').value.trim() || 'You';
    const from = modal.querySelector('#studio-from').value.trim() || 'Someone Special';
    const msg = modal.querySelector('#studio-msg').value.trim() || 'You bring so much sunshine and joy into my life!';
    const occasion = modal.querySelector('#studio-occasion').value;
    return { to, from, msg, card: occasion };
  };

  const buildShareUrl = (data) => {
    const payload = { ...data, t: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    return `${window.location.origin}/?card=${data.card}&to=${encodeURIComponent(data.to)}&from=${encodeURIComponent(data.from)}&msg=${encodeURIComponent(data.msg)}&w=${b64}`;
  };

  // Copy Link Action
  modal.querySelector('#studio-share-btn').addEventListener('click', () => {
    const data = getCardData();
    const shareUrl = buildShareUrl(data);

    navigator.clipboard.writeText(shareUrl).finally(() => {
      showToast('✨ Private card link copied to clipboard!');
      const shareBox = modal.querySelector('#studio-share-box');
      const shareInput = modal.querySelector('#studio-share-url');
      const waBtn = modal.querySelector('#studio-wa-btn');
      const testBtn = modal.querySelector('#studio-test-btn');
      const reCopyBtn = modal.querySelector('#studio-recopy-btn');

      shareInput.value = shareUrl;
      shareBox.style.display = 'block';

      const waText = encodeURIComponent(`Hey ${data.to}! I made a special interactive ${data.card} surprise just for you 🎁 Open it here: ${shareUrl}`);
      waBtn.href = `https://api.whatsapp.com/send?text=${waText}`;

      reCopyBtn.onclick = () => {
        navigator.clipboard.writeText(shareUrl);
        reCopyBtn.textContent = 'Copied!';
        setTimeout(() => { reCopyBtn.textContent = 'Copy'; }, 2000);
      };

      testBtn.onclick = () => {
        modal.remove();
        renderRecipientExperience(data, true);
      };
    });
  });

  // Play Live Card Action
  modal.querySelector('#studio-play-btn').addEventListener('click', () => {
    const data = getCardData();
    modal.remove();
    renderRecipientExperience(data, true);
  });
};

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
