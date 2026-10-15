/**
 * HeartCraft / Wish Card - Interactive Engine
 * Reverse-Engineered & Enhanced with Full Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTrendingCarousel();
  initTrendingInteractivePreviews();
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
        mobileChevron.style.transform = isSubOpen ? 'rotate(0deg)' : 'rotate(180deg)';
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
   2. TRENDING CAROUSEL (ARROWS & INDICATOR)
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
        const pct = (carousel.scrollLeft / maxScroll) * 60; // thumb width is 40%
        thumb.style.left = `${pct}%`;
      }
    };
    carousel.addEventListener('scroll', updateThumb, { passive: true });
    updateThumb();
  }
}

/* ==========================================================================
   3. INTERACTIVE PREVIEWS FOR TRENDING CARDS
   ========================================================================== */
function initTrendingInteractivePreviews() {
  setupValentinePreview();
  setupBirthdayPreview();
  setupSorryPreview();
  setupPuzzlePreview();
  setupAnniversaryPreview();
  setupFriendshipPreview();
}

/**
 * 3.1 Valentine Proposal "No" Button Dodger
 */
function setupValentinePreview() {
  const container = document.querySelector('.trending__preview--valentine');
  if (!container) return;

  const noBtn = container.querySelector('.vt-no-btn');
  const yesBtn = container.querySelector('.vt-yes-btn');
  const hint = container.querySelector('.vt-hint');
  const wrapper = container.querySelector('.vt-scale-wrapper');
  const cursor = container.querySelector('.vt-cursor');

  if (!noBtn || !yesBtn) return;

  const hints = [
    '"No" seems a bit shy 😉',
    'Are you sure? 🥺',
    'Nice try! You cannot say No! 😜',
    'Oops! Try again! 😂',
    'Love always finds a way! 💖',
    'Just click YES already! 🥰'
  ];
  let dodgeCount = 0;

  const dodge = (e) => {
    if (e) e.preventDefault();
    dodgeCount++;
    hint.textContent = hints[dodgeCount % hints.length];

    // Calculate safe random coordinates inside the button container
    const xPositions = [-80, 80, -60, 70, -75, 65];
    const yPositions = [-45, 45, -35, 40, -50, 35];
    const x = xPositions[dodgeCount % xPositions.length];
    const y = yPositions[dodgeCount % yPositions.length];
    const rot = (Math.random() * 20 - 10).toFixed(1);

    noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(0.9)`;
    yesBtn.style.transform = `scale(${1 + Math.min(dodgeCount * 0.08, 0.45)})`;
  };

  noBtn.addEventListener('mouseenter', dodge);
  noBtn.addEventListener('touchstart', dodge, { passive: false });
  noBtn.addEventListener('click', dodge);

  // Yes Button Celebration
  yesBtn.addEventListener('click', () => {
    fireConfetti(container);
    wrapper.innerHTML = `
      <div class="vt-result" style="animation: vtResultIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;">
        <span style="font-size: 3rem; margin-bottom: 8px;">💖💍🎉</span>
        <h3 class="vt-result-title" style="color: #e8456b; font-size: 1.3rem; margin: 0 0 6px;">She Said YES! 💖</h3>
        <p class="vt-result-sub" style="color: #6e5c62; font-size: 0.85rem; margin: 0 0 12px;">The best love story begins today!</p>
        <button class="vt-yes-btn" style="padding: 6px 18px; font-size: 12px; min-width: auto;" onclick="resetValentinePreview()">Replay 💫</button>
      </div>
    `;
    if (cursor) cursor.style.display = 'none';
  });

  // Automated simulated cursor demo when idle
  let autoTimer = setTimeout(() => {
    if (cursor && dodgeCount === 0) {
      cursor.style.opacity = '1';
      cursor.style.transform = 'translate(195px, 150px)';
      setTimeout(() => {
        dodge();
        setTimeout(() => {
          cursor.style.transform = 'translate(100px, 150px)';
        }, 600);
      }, 700);
    }
  }, 2500);

  window.resetValentinePreview = () => {
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
        <div class="vt-cursor" style="opacity:0;transform:translate(185px, 218px)">
          <svg width="17" height="24" viewBox="0 0 17 24"><path d="M0 0 L0 20 L4.5 15.5 L8 23 L11 21.5 L7.5 14 L13 14 Z" fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"></path></svg>
        </div>
      </div>
    `;
    setupValentinePreview();
  };
}

/**
 * 3.2 Birthday Card Multi-Stage Interactive Preview
 */
function setupBirthdayPreview() {
  const container = document.querySelector('.trending__preview--birthday');
  if (!container) return;

  const content = container.querySelector('.bd-content');
  if (!content) return;

  let currentStage = 0;

  const renderStage = (stage) => {
    currentStage = stage;
    content.classList.add('bd-content--fading');
    setTimeout(() => {
      content.classList.remove('bd-content--fading');

      if (stage === 0) {
        // Stage 0: QR Scan
        content.innerHTML = `
          <div class="bd-screen bd-screen--center">
            <div class="bd-qr-container" style="cursor: pointer;" onclick="advanceBirthday(1)">
              <div class="bd-qr-card">
                <img src="assets/birthday_qr.webp" class="bd-qr-img" alt="Birthday QR"/>
                <div class="bd-qr-label">Divya's Birthday!</div>
                <div class="bd-qr-scanline"></div>
              </div>
              <span class="bd-hint">Tap to open</span>
            </div>
          </div>
        `;
      } else if (stage === 1) {
        // Stage 1: Countdown Invitation
        content.innerHTML = `
          <div class="bd-screen bd-screen--celeb">
            <span class="bd-inv-sub">Virtual Birthday Bash</span>
            <span class="bd-inv-name">Happy Birthday Divya</span>
            <div class="bd-inv-divider"></div>
            <span class="bd-inv-begin">Party begins now</span>
            <div class="bd-timer-row">
              <div class="bd-timer-col"><span class="bd-timer-num">00</span><span class="bd-timer-lbl">Days</span></div>
              <span class="bd-timer-colon">:</span>
              <div class="bd-timer-col"><span class="bd-timer-num">00</span><span class="bd-timer-lbl">Hours</span></div>
              <span class="bd-timer-colon">:</span>
              <div class="bd-timer-col"><span class="bd-timer-num">00</span><span class="bd-timer-lbl">Mins</span></div>
            </div>
            <button class="bd-btn" onclick="advanceBirthday(2)">Pop Balloons! 🎈</button>
          </div>
        `;
      } else if (stage === 2) {
        // Stage 2: Balloons popping
        content.innerHTML = `
          <div class="bd-screen" style="padding: 10px;">
            <p style="color: #fff; font-size: 11px; margin-bottom: 8px; font-weight: 600;">Tap balloons to pop!</p>
            <div class="bd-balloons-row">
              <div class="bd-balloon-wrapper" onclick="popBalloon(this, 'H')">
                <div class="bd-balloon-visual">
                  <div class="bd-balloon-body" style="background: #ff4757;"></div>
                  <div class="bd-balloon-highlight"></div>
                  <div class="bd-balloon-text-outer"><span class="bd-balloon-text">H</span></div>
                </div>
                <div class="bd-balloon-string"></div>
              </div>
              <div class="bd-balloon-wrapper" onclick="popBalloon(this, 'B')">
                <div class="bd-balloon-visual">
                  <div class="bd-balloon-body" style="background: #ffa502;"></div>
                  <div class="bd-balloon-highlight"></div>
                  <div class="bd-balloon-text-outer"><span class="bd-balloon-text">B</span></div>
                </div>
                <div class="bd-balloon-string"></div>
              </div>
              <div class="bd-balloon-wrapper" onclick="popBalloon(this, 'D')">
                <div class="bd-balloon-visual">
                  <div class="bd-balloon-body" style="background: #2ed573;"></div>
                  <div class="bd-balloon-highlight"></div>
                  <div class="bd-balloon-text-outer"><span class="bd-balloon-text">D</span></div>
                </div>
                <div class="bd-balloon-string"></div>
              </div>
              <div class="bd-balloon-wrapper" onclick="popBalloon(this, '!')">
                <div class="bd-balloon-visual">
                  <div class="bd-balloon-body" style="background: #1e90ff;"></div>
                  <div class="bd-balloon-highlight"></div>
                  <div class="bd-balloon-text-outer"><span class="bd-balloon-text">!</span></div>
                </div>
                <div class="bd-balloon-string"></div>
              </div>
            </div>
            <button id="bd-to-cake" class="bd-btn bd-btn--sm" style="display: none; margin-top: 15px;" onclick="advanceBirthday(3)">Next: Cut Cake 🎂</button>
          </div>
        `;
      } else if (stage === 3) {
        // Stage 3: Cake & Candle
        content.innerHTML = `
          <div class="bd-screen" style="padding: 10px;">
            <div class="bd-cake-title-row">
              <span class="bd-cake-letter bd-cake-letter--c0">H</span>
              <span class="bd-cake-letter bd-cake-letter--c1">B</span>
              <span class="bd-cake-letter bd-cake-letter--c2">D</span>
              <span class="bd-cake-letter bd-cake-letter--c3">!</span>
            </div>
            <div id="cake-container" style="font-size: 3.5rem; line-height: 1; margin: 4px 0; text-align: center;">
              🎂✨
            </div>
            <button id="blow-btn" class="bd-btn bd-btn--sm bd-btn--cake-action" onclick="blowCandle()">Blow Candle 🕯️</button>
            <button id="letter-btn" class="bd-btn bd-btn--sm bd-btn--cake-action" style="display:none;" onclick="advanceBirthday(4)">Read Letter 💌</button>
          </div>
        `;
      } else if (stage === 4) {
        // Stage 4: Letter
        content.innerHTML = `
          <div class="bd-screen" style="padding: 8px;">
            <div class="bd-letter-card bd-letter-card--appear" style="width: 90%; padding: 10px;">
              <h4 class="bd-letter-title" style="margin: 0 0 4px; font-size: 11px;">Dear Divya,</h4>
              <p id="bd-typewriter" class="bd-letter-body" style="font-size: 9px; line-height: 1.4; color: #5a3e42; margin: 0;"></p>
            </div>
            <button class="bd-btn bd-btn--sm" style="margin-top: 8px;" onclick="advanceBirthday(0)">Replay 🎉</button>
          </div>
        `;
        typewriterEffect('bd-typewriter', "Happy Birthday to someone who brings so much joy into everyone's life! May all your wishes come true today and always. ❤️", 25);
      }
    }, 150);
  };

  window.advanceBirthday = (st) => renderStage(st);

  let poppedCount = 0;
  window.popBalloon = (wrapper, letter) => {
    const body = wrapper.querySelector('.bd-balloon-body');
    const text = wrapper.querySelector('.bd-balloon-text');
    const string = wrapper.querySelector('.bd-balloon-string');
    if (body.classList.contains('bd-balloon-body--popped')) return;

    body.classList.add('bd-balloon-body--popped');
    if (text) text.classList.add('bd-balloon-text--revealed');
    if (string) string.classList.add('bd-balloon-string--gone');
    poppedCount++;

    if (poppedCount >= 2) {
      const nextBtn = document.getElementById('bd-to-cake');
      if (nextBtn) nextBtn.style.display = 'inline-block';
    }
  };

  window.blowCandle = () => {
    fireConfetti(container);
    const cake = document.getElementById('cake-container');
    const blowBtn = document.getElementById('blow-btn');
    const letterBtn = document.getElementById('letter-btn');
    if (cake) cake.innerHTML = '🎂🎉🥳';
    if (blowBtn) blowBtn.style.display = 'none';
    if (letterBtn) letterBtn.style.display = 'inline-block';
  };

  const qrContainer = container.querySelector('.bd-qr-container');
  if (qrContainer) {
    qrContainer.style.cursor = 'pointer';
    qrContainer.addEventListener('click', () => renderStage(1));
  }
}

/**
 * 3.3 Sorry Card Interactive Preview
 */
function setupSorryPreview() {
  const container = document.querySelector('.trending__preview--sorry');
  if (!container) return;

  const wrapper = container.querySelector('.sorry-preview-wrapper');
  if (!wrapper) return;

  const qrCard = wrapper.querySelector('.qr-card');
  if (!qrCard) return;

  qrCard.style.cursor = 'pointer';
  qrCard.addEventListener('click', () => {
    wrapper.innerHTML = `
      <div class="sorry-screen" style="animation: noteAppear 0.4s ease forwards;">
        <span style="font-size: 2.2rem; margin-bottom: 2px;">🥺🐾</span>
        <h3 class="greeting-text" style="font-size: 18px; margin: 4px 0;">I am so sorry...</h3>
        <p class="greeting-sub" style="margin: 0 0 10px;">Will you please forgive me?</p>
        <div class="meter-track" style="width: 80%;">
          <div id="forgive-meter" class="meter-fill" style="width: 20%; background: #e91e8c;"></div>
        </div>
        <p id="meter-pct-lbl" style="color: #ff69b4; font-size: 11px; margin: 4px 0 8px; font-weight: bold;">Forgiveness: 20%</p>
        <button id="forgive-btn" class="btn-pink" onclick="boostForgiveness()">Tap to Forgive 💖</button>
      </div>
    `;
  });

  let pct = 20;
  window.boostForgiveness = () => {
    pct += 40;
    const meter = document.getElementById('forgive-meter');
    const lbl = document.getElementById('meter-pct-lbl');
    const btn = document.getElementById('forgive-btn');

    if (pct < 100) {
      if (meter) meter.style.width = `${pct}%`;
      if (lbl) lbl.textContent = `Forgiveness: ${pct}%`;
    } else {
      if (meter) meter.style.width = '100%';
      if (lbl) lbl.textContent = 'Forgiveness: 1000% (OVERFLOW!) 💖';
      fireConfetti(container);

      setTimeout(() => {
        wrapper.innerHTML = `
          <div class="sorry-screen" style="animation: noteAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;">
            <div class="note-card" style="padding: 12px; border-radius: 10px; width: 92%;">
              <span style="font-size: 1.8rem;">💌</span>
              <h4 style="color: #e91e8c; margin: 2px 0 6px; font-size: 12px;">Forgiven!</h4>
              <p style="color: #5a3e42; font-size: 9.5px; line-height: 1.4; margin: 0; font-family: cursive;">
                "I know I messed up, but you mean the absolute world to me. Can we make up? Ice cream on me? 🍦🥺💖"
              </p>
            </div>
            <button class="btn-pink" style="margin-top: 8px; font-size: 10px; padding: 5px 14px;" onclick="resetSorryPreview()">Replay 💫</button>
          </div>
        `;
      }, 700);
    }
  };

  window.resetSorryPreview = () => {
    wrapper.innerHTML = `
      <div class="sorry-screen">
        <div class="qr-card qr-pop-in" style="cursor: pointer;">
          <img src="assets/heart_qr.webp" class="qr-img" alt="QR"/>
          <div class="qr-overlay"><span class="qr-overlay-text">Someone</span></div>
          <div class="scan-line"></div>
        </div>
        <span class="hint-text hint-text--mt">Tap to open</span>
      </div>
    `;
    setupSorryPreview();
  };
}

/**
 * 3.4 Surprise Photo Puzzle Interactive Preview
 */
function setupPuzzlePreview() {
  const container = document.querySelector('.trending__preview--puzzle');
  if (!container) return;

  const grid = container.querySelector('.pz-grid');
  if (!grid) return;

  const pieces = grid.querySelectorAll('.pz-piece');
  let selected = null;

  pieces.forEach((piece, idx) => {
    piece.style.cursor = 'pointer';
    piece.addEventListener('click', () => {
      if (!selected) {
        selected = piece;
        piece.style.outline = '2px solid #e91e63';
      } else {
        // Swap positions
        const tempTransform = selected.style.transform;
        selected.style.transform = piece.style.transform;
        piece.style.transform = tempTransform;

        selected.style.outline = 'none';
        selected = null;
      }
    });
  });

  // Clicking badge triggers puzzle solve reveal
  const badge = container.querySelector('.pz-overlay-badge');
  if (badge) {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', () => {
      fireConfetti(container);
      container.innerHTML = `
        <div class="pz-container">
          <div class="pz-msg-container pz-msg-container--visible" style="opacity: 1; transform: scale(1);">
            <div class="pz-msg-emojis">✨🧩❤️</div>
            <h4 class="pz-msg-title">Puzzle <span>Solved!</span></h4>
            <div class="pz-msg-card">
              <p class="pz-msg-note">"You put the pieces of my heart together. Will you go out with me this weekend? 🌸"</p>
            </div>
            <button class="pz-continue-btn" onclick="resetPuzzlePreview()">Replay 🧩</button>
          </div>
        </div>
      `;
    });
  }

  window.resetPuzzlePreview = () => {
    container.innerHTML = `
      <div class="pz-container">
        <div class="pz-scale-wrapper">
          <div class="pz-grid-wrapper">
            <div class="pz-grid-card">
              <div class="pz-grid" style="width:169px;height:169px">
                <div class="pz-piece" style="transform:translate(0px, 0px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:0px 0px"></div>
                <div class="pz-piece" style="transform:translate(55px, 0px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-55px 0px"></div>
                <div class="pz-piece" style="transform:translate(110px, 0px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-110px 0px"></div>
                <div class="pz-piece" style="transform:translate(0px, 55px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:0px -55px"></div>
                <div class="pz-piece" style="transform:translate(55px, 55px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-55px -55px"></div>
                <div class="pz-piece" style="transform:translate(110px, 55px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-110px -55px"></div>
                <div class="pz-piece" style="transform:translate(0px, 110px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:0px -110px"></div>
                <div class="pz-piece" style="transform:translate(55px, 110px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-55px -110px"></div>
                <div class="pz-piece" style="transform:translate(110px, 110px);background-image:url(assets/Logo-Selfi.webp);background-size:165px 165px;background-position:-110px -110px"></div>
                <div class="pz-overlay-badge"><span>✨ Tap to Solve</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    setupPuzzlePreview();
  };
}

/**
 * 3.5 Anniversary Special Phone Mockup
 */
function setupAnniversaryPreview() {
  const container = document.querySelector('.trending__preview--anniversary');
  if (!container) return;

  const phone = container.querySelector('.tpda-phone');
  if (!phone) return;

  const yesBtn = phone.querySelector('.tpda-yes');
  const noBtn = phone.querySelector('.tpda-no');

  if (noBtn) {
    let noDodge = 0;
    noBtn.addEventListener('mouseenter', () => {
      noDodge++;
      noBtn.className = `tpda-btn tpda-no tpda-no--dodge-${(noDodge % 3) + 1}`;
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      fireConfetti(container);
      phone.innerHTML = `
        <div class="tpda-notch"></div>
        <div class="tpda-screen tpda-s3" style="padding-top: 32px; animation: tpda-screen-in 0.4s ease;">
          <h4 class="tpda-s3__title" style="font-size: 1.1rem; margin: 4px 0;">Love Meter</h4>
          <p class="tpda-s3__sub" style="font-size: 8px;">Measuring infinite affection</p>
          <div class="tpda-s3__meter-wrap is-full">
            <div class="tpda-s3__meter" style="width: 70px; height: 140px;">
              <div class="tpda-s3__fill" style="height: 100%;"></div>
              <div class="tpda-s3__center">
                <span class="tpda-s3__pct" style="font-size: 13px;">100%</span>
                <span style="font-size: 14px;">💖</span>
              </div>
            </div>
          </div>
          <button class="tpda-btn tpda-yes" style="margin-top: 14px; font-size: 10px; padding: 5px 14px;" onclick="resetAnniversaryPreview()">Replay 💫</button>
        </div>
        <div class="tpda-home-bar"></div>
      `;
    });
  }

  window.resetAnniversaryPreview = () => {
    location.reload();
  };
}

/**
 * 3.6 Friendship Day Interactive Preview
 */
function setupFriendshipPreview() {
  const container = document.querySelector('.trending__preview--friendship');
  if (!container) return;

  const btn = container.querySelector('.fd-btn');
  const message = container.querySelector('.fd-message');
  if (!btn || !message) return;

  btn.addEventListener('click', () => {
    fireConfetti(container);
    message.textContent = 'You are the best friend ever! 💖';
    message.style.color = '#e11d48';
    btn.textContent = 'Hugs Sent! 🤗';
    setTimeout(() => {
      message.textContent = 'Happy Friendship Day! 🫂';
      message.style.color = '#3f2a12';
      btn.textContent = 'Open Surprise 🎁';
    }, 3000);
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

  // Add click listeners to dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlides(i));
  });

  // Clicking side slide navigates directly
  slides.forEach((slide, i) => {
    slide.style.cursor = 'pointer';
    slide.addEventListener('click', () => {
      if (i !== currentIndex) updateSlides(i);
    });
  });

  // Auto rotation
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
    { title: 'Step 1: Pick a Card', img: 'assets/pencil.webp', desc: 'Choose from our curated collection of interactive birthday, proposal, apology, anniversary, friendship and thank you cards.' },
    { title: 'Step 2: Add Your Love', img: 'assets/plan.webp', desc: 'Personalize the card with your favorite photos, secret inside jokes, cute messages, and interactive surprises.' },
    { title: 'Step 3: Send With Love', img: 'assets/target.webp', desc: 'Send your personalized card as a single link via WhatsApp, Instagram or SMS. No app download needed for them!' }
  ];

  cards.forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const step = stepDetails[idx] || stepDetails[0];
      const modal = document.createElement('div');
      modal.className = 'how-it-works__modal';
      modal.innerHTML = `
        <div class="how-it-works__modal-content" style="max-width: 420px; text-align: center; padding: 2rem;">
          <button class="how-it-works__modal-close">&times;</button>
          <img src="${step.img}" alt="${step.title}" style="width: 80px; height: 80px; margin: 0 auto 1rem;" />
          <h3 style="font-family: Poppins, sans-serif; font-size: 1.3rem; margin-bottom: 0.5rem; color: #1a1a1a;">${step.title}</h3>
          <p style="font-family: Poppins, sans-serif; font-size: 0.95rem; line-height: 1.6; color: #555; margin-bottom: 1.5rem;">${step.desc}</p>
          <button class="hero__cta hero__cta--secondary" style="background: #efa7d6; color: #1a1a1a; border: none; padding: 0.6rem 1.5rem;" onclick="this.closest('.how-it-works__modal').remove(); openStudio();">Try It Now ✨</button>
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
   6. INTERACTIVE CARD STUDIO MODAL & CARD PLAYER
   ========================================================================== */
function initCardStudioModal() {
  // Bind all "Create now" / "Pick a card" CTAs
  document.querySelectorAll('a[href*="create"], a.hero__cta, a.categories__bento-card, a.trending__cta, a.cta__button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      // If anchor internal link (like #categories or cards.html), let normal navigation work
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
    background: rgba(26, 10, 26, 0.7);
    backdrop-filter: blur(8px);
    display: flex; justify-content: center; align-items: center;
    padding: 1rem; animation: fadeIn 0.25s ease;
  `;

  modal.innerHTML = `
    <div style="background: #fff; width: 100%; max-width: 520px; border-radius: 1.5rem; box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow: hidden; position: relative; font-family: 'Poppins', sans-serif;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #edc9e0 0%, #efa7d6 100%); padding: 1.5rem 1.75rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06);">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <img src="assets/logo.png" style="width: 28px; height: 28px; object-fit: contain;" alt="HeartCraft" />
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #1c1917;">HeartCraft Studio</h3>
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

/**
 * Fullscreen Interactive Card Player
 */
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

    <div style="width: 100%; max-width: 380px; height: 600px; background: #fff; border-radius: 2rem; box-shadow: 0 30px 80px rgba(0,0,0,0.5); overflow: hidden; position: relative; display: flex; flex-direction: column; font-family: 'Poppins', sans-serif;">
      <!-- Top phone bar -->
      <div style="background: #fdf2f8; padding: 0.75rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <span style="font-size: 0.8rem; font-weight: 600; color: #9b2a6e;">HeartCraft Card</span>
        <span style="font-size: 0.8rem; color: #999;">Just now</span>
      </div>

      <!-- Card Stage Content -->
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

function typewriterEffect(elementId, text, speed = 30) {
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
    p.vy += 0.25; // gravity
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
