# 📘 ContentForge

## Introduction

ContentForge is an AI-powered web application designed to generate high-quality content such as LinkedIn posts, captions, emails, and more using advanced AI models. The goal is to build a clean, modern SaaS-style platform with strong user experience and scalable architecture.

---

## Objectives

* Build a modern frontend using React (Vite)
* Design a clean and responsive UI using Tailwind CSS
* Structure the project for scalability and maintainability
* Prepare the foundation for AI integration

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

## UI Design Plan

* Theme: Dark UI
* Primary Color: Indigo (#6366F1)
* Background: #0F172A
* Card: #1E293B
* Font: Inter
* Focus: Clean, minimal, SaaS-style interface

---

## Current Progress

* Project initialized using Vite
* Tailwind CSS configured
* Folder structure organized
* Base UI planning completed

---

## Upcoming Features

* Navbar and Hero section
* Content generator interface
* AI integration
* User dashboard
* Advanced features and deployment

---
