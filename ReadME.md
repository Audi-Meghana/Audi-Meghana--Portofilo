# 🚀 Audi Meghana — Developer Portfolio

## 📁 File Structure

```
portfolio/
├── index.html                  ← Main HTML (all sections)
├── src/
│   ├── styles/
│   │   └── main.css            ← All styles (glassmorphism, animations, responsive)
│   └── components/
│       └── main.js             ← All JavaScript (canvas, cursor, typewriter, 3D tilt)
└── README.md
```

## ✅ Features

- 🎨 **Glassmorphism UI** — glass cards, blur effects, borders
- 🌌 **Animated Canvas Background** — neural network particles + animated blobs
- ✨ **Custom Neon Cursor** — follows mouse with ring effect
- ⌨️ **Typewriter Effect** — cycles through roles
- 📊 **Animated Skill Bars** — triggered on scroll
- 🔢 **Counter Animation** — stats count up on load
- 🃏 **3D Card Tilt** — project cards tilt on mouse hover
- 📜 **Scroll Reveal** — sections fade in as you scroll
- 📱 **Fully Responsive** — mobile-first design
- 🔗 **All Live Links** — DocSpot, TrustHive, EduPath, Research Paper

## 🚀 How to Run

Simply open `index.html` in a browser — no build tools needed!

Or use Live Server in VS Code:
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## 🔧 How to Update

### Change Your Name / Info
Edit `index.html` — search for "Audi Meghana" or "audimeghana@gmail.com"

### Add a New Project
Copy one of the `.project-card` blocks in `index.html` and update the content.

### Add Your LinkedIn / GitHub
In `index.html`, find the social links section and replace `#` with your actual URLs.

### Change Colors
In `main.css`, edit the `:root` variables:
- `--accent`  : main teal color  (#00f5d4)
- `--accent2` : purple highlight (#7c3aed)
- `--accent3` : amber/gold       (#f59e0b)

## 📦 Deploy

**Netlify (free):**
1. Drag-and-drop the `portfolio/` folder at netlify.com/drop

**GitHub Pages:**
1. Push to GitHub repo
2. Settings → Pages → Source: main branch

## 📬 Contact Form
The form currently shows a success animation. To make it functional, integrate with:
- **EmailJS** (free) — https://emailjs.com
- **Formspree** (free) — https://formspree.io
- **Netlify Forms** (if deploying to Netlify — just add `netlify` attribute to the form tag)