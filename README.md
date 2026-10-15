# HeartCraft / Wish Card 💌✨

> **Personalized Interactive Digital Greeting Cards** — A pixel-perfect, reverse-engineered clone of [myheartcraft.com](https://myheartcraft.com/) enhanced with full client-side interactivity, live playable card previews, a built-in Card Studio, and a standalone server.

![HeartCraft Banner](assets/logo.png)

---

## 🌟 Highlights & Features

- **Pixel-Accurate Visual Design**:
  - Warm, playful luxury palette (`#edc9e0`, `#e4d9f1`, `#9b2a6e`, `#efa7d6`).
  - Google Fonts typography (`Playfair Display`, `Poppins`, `Inter`, `DM Serif Display`, `Caveat`, `Instrument Serif`).
  - Scalloped wave borders, grain noise textures, and blurred ambient glow lights.

- **Interactive Trending Cards (Live Interactive Previews)**:
  - 💍 **The "Unrejectable" Proposal**: The "No" button playfully dodges away whenever hovered or clicked, while "Yes" triggers a vibrant confetti explosion!
  - 🎂 **Virtual Birthday Bash**: Multi-step interactive experience with laser QR scanner, countdown invitation, interactive balloon popping room, blowable candles on a birthday cake, and typewriter letter reveal.
  - 🥺 **Heartfelt Apology**: Interactive forgiveness meter filling up to 1000% overflow with confetti, followed by an unrolling wax-sealed apology note.
  - 🧩 **Surprise Photo Puzzle**: 3x3 interactive sliding photo puzzle with solve detection, celebration badges, and love note reveal.
  - 💑 **Anniversary Special**: iPhone 16 Pro mockup with live falling hearts, ticking anniversary countdown, memory reel, love meter, and wax-seal letter.
  - 🫂 **Friendship Day**: Floating emoji particle animation with confetti celebration.

- **Bento Grid & Occasions Catalog**:
  - Full occasion bento grid: Birthday, Sorry, Proposal, Photo Puzzle, Anniversary, Friendship, Mother's Day, Thank You, Miss You, and Love Letter App.
  - Dedicated `/cards.html` catalog hub with occasion categorization and filters.

- **Interactive "Card Studio" & Player**:
  - Built-in live modal allowing visitors to type recipient and sender names, choose occasion, write a custom message, and instantly play or copy a shareable link.

- **Creators Love Us (3D Testimonials Slider)**:
  - 3D coverflow carousel with smooth transitions, pagination dots, and creator verification badges.

- **100% Self-Contained**:
  - All images, icons, and SVG illustrations are locally stored in `./assets/` — no broken external image links.
  - Zero mandatory backend dependencies (pure HTML5, CSS3, and modern Vanilla JS).

---

## 🚀 Quick Start

### 1. Run with Node.js
```bash
# Clone the repository
git clone https://github.com/iammahmudhasan/Wish-Card.git
cd Wish-Card

# Start the local server
npm start
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

### 2. Run Directly in Browser
You can also open `index.html` or `cards.html` directly in any web browser!

---

## 📂 Project Structure

```
Wish-Card/
├── assets/                     # Downloaded high-resolution graphics, logos, and preview images
│   ├── logo.png
│   ├── couple.webp
│   ├── birthday_qr.webp
│   ├── heart_qr.webp
│   ├── IMG_5723.webp
│   ├── Logo-Selfi.webp
│   └── ...
├── index.html                  # Main landing page with all interactive card simulations
├── cards.html                  # Occasions catalog & cards browse page
├── app.js                      # Core interactivity engine (carousel, dodging button, confetti, studio)
├── server.js                   # Lightweight static file HTTP server
├── 0kcx.css                    # Core component styles, bento grid, phone frames, and animations
├── 0vz8.css                    # Navigation bar & mobile drawer styles
├── 0wxh.css                    # Tailwind utility and typography classes
├── catalog_1lxw.css            # Catalog page design system
├── catalog_0os9.css            # Catalog typography & icons
├── package.json                # Project configuration
└── README.md                   # Documentation
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document structure & accessibility
- **CSS3 / Vanilla CSS**: Custom animations, glassmorphism, responsive bento grids, 3D transforms
- **JavaScript (ES6+)**: Custom confetti engine, carousel controller, and card player logic
- **Node.js**: Static file server

---

## 📜 License

Created for educational, demonstration, and personal portfolio purposes. Inspired by HeartCraft (`https://myheartcraft.com/`).
