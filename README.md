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

* **Frontend:** React (Vite), Tailwind CSS, TypeScript
* **Backend:** Node.js, Express.js
* **Other:** Google Fonts (Inter), CORS, dotenv

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Running the Application

#### Development Mode (Frontend + Backend)

1. Start the backend server:

```bash
npm run server
```

2. In a new terminal, start the frontend development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:4173` and will proxy API requests to `http://localhost:5000`.

#### Production Build

```bash
npm run build
npm run preview
```

---

## Backend API

The backend is built with Node.js and Express.js, providing RESTful API endpoints.

### Current Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/test` - Test API route

### Project Structure

```
backend/
├── server.js          # Main server file
├── routes/
│   └── api.js         # API routes
└── middleware/        # Future middleware
```

### Adding New Routes

Add new routes in `backend/routes/api.js` or create separate route files and import them in `server.js`.

---

## Frontend Setup

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
