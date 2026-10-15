# WishCard 💌✨

> **Personalized Interactive Digital Greeting Cards** — A pixel-perfect, reverse-engineered interactive digital card platform enhanced with full continuous animated preview loops, live interactive simulations, custom card builder studio, and self-contained static server.

![WishCard Banner](assets/logo.png)

---

## 🌟 Highlights & Features

- **Continuous Live Autoplay Demonstration Loops**:
  - 💍 **The "Unrejectable" Proposal**: Auto-animated cursor glides toward "No", "No" playfully dodges away 4 times while hint text cycles playfully (*"Are you sure? 🥺"*, *"Think again! 😜"*, *"You cannot say No! 💕"*). Cursor then glides to "Yes", clicks it, and triggers a full heart confetti celebration! (Also supports real user mouse & touch interactions).
  - 🎂 **Virtual Birthday Bash**: Autonomous multi-step journey featuring a glowing laser-scanline QR code, live countdown ticker (`03`.. `02`.. `01`..), clickable party lights, sequentially popping balloons with strings vanishing & text reveal (*"You are so special"*), birthday cake with flickering candles that blow out, and a handwritten parchment letter that unrolls and types out with typewriter effect!
  - 🥺 **Heartfelt Apology**: Laser scanline QR code, cute apologetic character with floating hearts, forgiveness meter smoothly climbing to 100% and 120% overflow, 3 sweet reason cards, and wax-sealed apology note reveal!
  - 🧩 **Surprise Photo Puzzle**: 3x3 photo puzzle with pieces scrambling, animated cursor swapping pieces into place, golden badge flashing *"✅ Solved!"*, and love note reveal!
  - 💑 **Anniversary Special**: iPhone 16 Pro mockup with live falling hearts, ticking anniversary countdown, couple memory, love meter filling to 100%, and love letter!
  - 🫂 **Friendship Day**: Floating emoji particle animation with cycling bestie quotes and confetti!

- **Bento Grid & Occasions Catalog**:
  - Full occasion bento grid: Birthday, Sorry, Proposal, Photo Puzzle, Anniversary, Friendship, Mother's Day, Thank You, Miss You, and Mobile App.
  - Dedicated `/cards.html` catalog hub with occasion categorization and filters.

- **How It Works (Crisp Vector Illustrations)**:
  - High-resolution SVG illustrations for Step 1 (Pencil), Step 2 (Paper Airplane), and Step 3 (Bullseye Target) with interactive preview lightbox modal!

- **Interactive "WishCard Studio" & Player**:
  - Built-in live modal allowing visitors to type recipient and sender names, choose occasion, write a custom message, and instantly play or copy a shareable link.

- **Creators Love Us (3D Testimonials Slider)**:
  - 3D coverflow carousel with smooth transitions, pagination dots, and creator verification badges with auto-rotation.

- **100% Self-Contained**:
  - All images, icons, and SVG illustrations are locally stored in `./assets/` — zero broken external image links.
  - Pure HTML5, CSS3, and modern Vanilla JS (no heavy frameworks required to run).

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
├── assets/                     # Downloaded high-resolution graphics, logos, and preview SVGs
│   ├── logo.png
│   ├── couple.webp
│   ├── birthday_qr.webp
│   ├── heart_qr.webp
│   ├── pencil.svg              # High-res SVG pencil illustration
│   ├── plan.svg                # High-res SVG paper airplane illustration
│   ├── target.svg              # High-res SVG bullseye target illustration
│   ├── Logo-Selfi.webp
│   └── ...
├── index.html                  # Main landing page with all interactive card simulations
├── cards.html                  # Occasions catalog & cards browse page
├── app.js                      # Core autoplay & interactivity engine
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

## 📜 License

Created for educational, demonstration, and personal portfolio purposes.
