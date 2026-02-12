# OOMI WORKS - Digital Creative Lab

![Oomi Works Banner](src/assets/images/oomi_1.png)

This is the revamped codebase for **OOMI WORKS**, a high-performance creative agency portfolio built with **Astro**. This project migrates the previous React SPA architecture to **Astro Islands architecture** to achieve maximum performance (Lighthouse Score 90-100) while maintaining rich interactivity.

## 🚀 Tech Stack

- **Core Framework:** [Astro v5](https://astro.build/) (Static Site Generation)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Interactivity:** [React](https://reactjs.org/) (Used selectively via Islands Architecture)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & CSS Native Animations
- **Image Optimization:** Astro Assets (Sharp)

## ✨ Key Features & Optimizations

### 1. Hybrid Rendering (Islands Architecture)
Unlike the previous SPA version, this site sends **Zero JavaScript** to the browser for static content (Hero text, About, Footer). JavaScript is only loaded for interactive components when needed.

- **`client:load`**: Used for critical interactive elements like the **Navbar** & **Preloader**.
- **`client:visible`**: Heavy components like **ScrollFloat**, **CurvedLoop**, and **FlowingMenu** are only downloaded and hydrated when the user scrolls them into view.

### 2. UI Components
- **Staggered Menu:** A hybrid navigation system. Fullscreen overlay on mobile, elegant floating card on desktop.
- **Curved Text Loop:** SVG-based animated text that follows a quadratic curve path.
- **Preloader Curtain:** A cinematic entry animation that masks initial asset loading.
- **Bento Grid:** A responsive CSS Grid layout for services.
- **Accordion FAQ:** Native HTML `<details>` and `<summary>` for lightweight interaction.

### 3. Performance Tuning (Lighthouse 100 Goal)
- **Font Preloading:** Critical fonts (`Novecento`, `One`) are preloaded in `<head>` to prevent FOUC (Flash of Unstyled Content).
- **Image Optimization:** All images use `.avif` or `.webp` formats with explicit dimensions to prevent CLS (Cumulative Layout Shift).
- **Lazy Loading:** Native `loading="lazy"` attributes on below-the-fold images.
- **HTML Compression:** Enabled in Astro config for smaller payload size.

## 📂 Project Structure

```text
/
├── public/
│   └── fonts/             # Local font files (.otf, .ttf)
├── src/
│   ├── assets/
│   │   └── images/        # Static images (optimized by Astro)
│   ├── components/
│   │   ├── CurvedLoop.jsx # SVG Text Animation
│   │   ├── StaggeredMenu.jsx # Main Navigation
│   │   ├── Preloader.jsx  # Loading Screen
│   │   └── ...            # Other React components
│   ├── layouts/
│   │   └── Layout.astro   # Main HTML wrapper (Head, Meta, Fonts)
│   ├── pages/
│   │   └── index.astro    # Homepage (Composition root)
│   └── styles/
│       └── global.css     # Font face definitions & Tailwind directives
├── astro.config.mjs       # Astro configuration
└── tailwind.config.mjs    # Tailwind configuration