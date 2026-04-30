# 📘 ContentForge

## Introduction

ContentForge is an AI-powered web application designed to generate high-quality content such as LinkedIn posts, captions, emails, and more using advanced AI models. The platform focuses on delivering a clean, modern SaaS-style experience with strong usability and performance.

---

## Objectives

* Build a responsive and modern frontend using React (Vite)
* Design a premium UI using Tailwind CSS
* Create a scalable and well-structured project architecture
* Prepare the foundation for backend and AI integration

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* JavaScript (ES6+)
* Google Fonts (Inter)

---

## Setup Instructions

### Create Project

```bash
npm create vite@latest contentforge
cd contentforge
npm install
npm run dev
```

### Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind

Update `tailwind.config.js`:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

Add to `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Folder Structure

```
src/
 ├── components/
 ├── pages/
 ├── utils/
 ├── App.jsx
 └── main.jsx
```

---

## UI Design System

### Theme

* Dark Mode (SaaS style)

### Colors

* Primary: #6366F1 (Indigo)
* Background: #0F172A
* Card: #1E293B
* Text: #E2E8F0
* Accent: #22C55E

### Typography

* Font: Inter
* Clean, minimal hierarchy

---

## Features Implemented

### Layout

* Navbar with branding (ContentForge)
* Hero section with heading and CTA

### Generator UI

* Content type selector (LinkedIn, Caption, Email)
* Input field for topic/keywords
* Generate button

### Output Section

* Output display card
* Copy button
* Regenerate button

### UI/UX Enhancements

* Dark theme with consistent spacing
* Responsive design (mobile + desktop)
* Hover effects and transitions
* Loading indicator
* Disabled button during processing

### Component Structure

* Chat/Generator components separated
* Reusable UI elements created

---

## Current Progress

* Frontend UI fully completed
* Clean and modern SaaS-style design achieved
* Fully responsive layout implemented
* Ready for backend and API integration

---

## Next Steps

* Setup backend using Node.js + Express
* Integrate AI API (OpenAI / Gemini)
* Create content generation endpoint
* Connect frontend with backend

---
