#Afsana Sadegi Beauty — Lipstick Shop

A fully functional, responsive e-commerce demo built with **HTML, CSS, Bootstrap 5, and Vanilla JavaScript** (no frameworks, no build step).

## 🚀 How to Run

1. Unzip the project.
2. Open `index.html` directly in your browser **OR** serve the folder with any static server, e.g.:
   ```bash
   # Python 3
   python -m http.server 8000
   # then open http://localhost:8000
   ```

## 📁 Folder Structure

```
lipstick-shop/
├── index.html         # Home page (products, search, filter, carousel)
├── about.html         # About page
├── contact.html       # Contact page (validated form)
├── cart.html          # Cart + checkout (validated form)
├── css/
│   └── style.css      # All styles (themed light/dark)
├── js/
│   └── script.js      # All logic (products, cart, search, filter, theme, validation)
└── images/            # Product + hero images
```
## ✨ Features

- **10 products** rendered dynamically from a JS array
- **Shopping cart** with add / remove / +/− qty / subtotal / tax / shipping (persisted via `localStorage`)
- **Live search** by name or description
- **Category filter** (All, Matte, Glossy, Waterproof, Luxury)
- **Dark mode toggle** (persisted)
- **Bootstrap components**: Navbar, Carousel, Modal (quick view), Toast
- **Form validation** with real-time error messages (contact + checkout)
- **Fake checkout confirmation** screen with order number
- **Responsive** — mobile, tablet, desktop
- **Accessible** — alt text, ARIA labels, keyboard focus, contrast
- **Animations** — fade-in, hover scale, badge bump, smooth transitions
- **Font Awesome icons** + Google Fonts (Playfair Display + Poppins)

## 🎨 Design

Soft feminine palette — blush pink, nude, deep rose accent, warm white. Dark mode uses deep plum surfaces with rose highlights.
Enjoy! 💄
