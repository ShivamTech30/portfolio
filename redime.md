# 🌟 Shivam Sharma — Full-Stack Portfolio & AI Assistant

A modern, high-performance portfolio application built with **React 18**, **Three.js / 3D Graphics**, **Framer Motion**, and a dedicated **Node.js/Express Serverless Backend** powered by **Google Gemini AI**.

---

## 📌 Architecture & Design Philosophy

The application is structured as a **decoupled full-stack architecture**:

```
portfolio/
├── portfolioFrontend/          # Client-side SPA (React + Vite + Tailwind + Three.js)
│   ├── src/
│   │   ├── components/         # Modular UI & 3D components
│   │   │   ├── 3D/             # Three.js / React Three Fiber interactive scenes
│   │   │   ├── ShivamAssistant # Floating Voice & Text AI Assistant widget
│   │   │   └── ...             # Hero, Skills, Experience, Projects, Contact, Testimonials
│   │   ├── pages/              # Routed views (Home, About, Projects, Contact, MyAi)
│   │   ├── store/              # Redux Toolkit state slices
│   │   └── utils/              # AI proxy helpers & Speech Synthesis (TTS/STT)
│   └── vercel.json             # Frontend routing & SPA rewrites
│
└── portfolioBackend/           # Serverless Node.js / Express API
    ├── config/                 # Environment variables loader
    ├── controllers/            # Request handlers & validation
    ├── knowledge/              # Markdown knowledge base (shivam.md)
    ├── routes/                 # Express API routes (/api/ai/...)
    ├── services/               # Google Gemini AI integration & fallback engine
    ├── tests/                  # Automated AI chat test suite
    ├── server.js               # Express application entry & export
    └── vercel.json             # Vercel serverless functions configuration
```

---

## 🚀 Frontend Implementation Details

### 1. Modern Technology Stack
- **Framework & Build Tool:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized production bundles.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + PostCSS with customized color palettes, responsive typography, and glassmorphism styling.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for scroll-triggered viewport animations, page transitions, and smooth hover micro-interactions.
- **3D Graphics:** [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber) and [`@react-three/drei`](https://github.com/pmndrs/drei) rendering real-time interactive 3D hero objects and geometries.
- **State Management:** [Redux Toolkit (`@reduxjs/toolkit`)](https://redux-toolkit.js.org/) for clean, predictable global state (e.g., contact form submissions and session state).
- **Forms & Validation:** [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) for client-side validation and structured input handling.
- **Icons & Markdown:** [Lucide React](https://lucide.dev/) icons + [React Markdown](https://github.com/remarkjs/react-markdown) for formatting rich AI replies.

### 2. Key Frontend Features
- **Interactive 3D Canvas:** Real-time Three.js scene mounted on the landing hero section (`HeroCanvas.jsx`) with mouse tracking and dynamic lighting.
- **Dual AI Assistant Interfaces:**
  1. **Floating AI Assistant Widget (`ShivamAssistant.jsx`):** A floating, collapsible chat drawer accessible from any page with quick suggestion chips, live typing indicator, and copy-to-clipboard functionality. Supports multi-turn memory passing.
  2. **Dedicated Fullscreen AI Experience (`MyAi.jsx`):** An in-depth conversational playground to explore Shivam's career, technical projects, architecture experience, and achievements. Supports multi-turn memory passing.
- **Voice Synthesis & Speech Recognition (`speech.js`):**
  - **Text-to-Speech (TTS):** Integrated browser Web Speech API with selectable voice personas (Indian Female/Pooja, Global Female/Samantha, Indian Male/Shivam, Global Male/Alex, and Hindi accents).
  - **Speech-to-Text (STT):** Voice dictation allowing users to speak their questions directly.
  - **Audio Sanitizer:** `cleanMarkdownForSpeech` regex filters stripping markdown tags, links, and code snippets before audio readout so synthesis sounds completely natural.
- **Dual-Layer Fallback Architecture:**
  - When the backend or network is reachable, user prompts and the last 8 conversation turns are forwarded to the secure backend Gemini API.
  - If the user is offline or the proxy is unavailable, the frontend seamlessly switches to a client-side **Built-in Knowledge Engine** (`getSmartFallbackResponse`) so visitors never see broken errors.
- **Responsive Layout & Accessibility:** Mobile-first responsive navigation bar, theme-consistent dark accents, scroll-to-top automation, and custom loaders.

---

## ⚙️ Backend Implementation Details

### 1. Purpose & Security Model
- **Zero API Key Leakage:** Google Gemini API keys are kept strictly on the server (`portfolioBackend/.env` and Vercel Production Environment Variables). The client application never has access to the secret key.
- **Clean REST Abstraction & Memory:** The client dispatches `{ prompt: "...", history: [...] }` to `/api/ai/chat`. The backend manages context, history trimming (last 8 messages), system instructions, and Google Gemini API communication.
- **Enterprise Security Hardening:**
  - **CORS Restriction:** Enforces origins from `ALLOWED_ORIGIN` env var (with local development support).
  - **Rate Limiting:** Protects `/api/ai` endpoints with `express-rate-limit` (20 requests/minute per IP).
  - **Input Sanitization:** Caps prompt length at 500 characters with immediate descriptive 400 validation error.

### 2. Modular Architecture
- **`server.js`:**
  - Express application initialization.
  - Configures restricted CORS via `ALLOWED_ORIGIN`.
  - Integrates `express-rate-limit` on `/api/ai` routes.
  - Exposes health check endpoint (`GET /`) returning `Backend API is running.`.
  - Exports Express instance for Vercel's serverless handler `@vercel/node`.
- **`config/env.js`:**
  - Loads environment variables (`PORT`, `GEMINI_API_KEY`, `ALLOWED_ORIGIN`) using `dotenv`.
- **`knowledge/shivam.md`:**
  - Dedicated knowledge document loaded into memory at startup.
  - Structured into: About, Experience, Skills, Projects, Education, Availability, Contact, and a 15-question Recruiter FAQ.
- **`routes/ai.routes.js`:**
  - `POST /api/ai/chat` &mdash; Full AI dialogue endpoint with conversation memory.
  - `POST /api/ai/prompt` &mdash; Prompt testing endpoint.
- **`controllers/ai.controller.js`:**
  - Validates prompt (non-empty, <= 500 characters) and trims conversation history to last 8 messages.
  - Calls service layer, handles errors gracefully, and returns structured JSON responses:
    ```json
    {
      "success": true,
      "prompt": "...",
      "response": "..."
    }
    ```
- **`services/gemini.service.js`:**
  - **System Instruction Field:** Feeds `knowledge/shivam.md` plus operational rules via Gemini's native `systemInstruction` field, keeping the prompt and history separated in `contents`.
  - **Rules Enforcement:** Answers only about Shivam; politely redirects off-topic questions; never guesses (refers missing info to email); never shares salary or private details; maintains concise answers; responds in the user's language (English/Hindi/Hinglish); and resists prompt-injection attempts.
  - **Multi-Model Failover Mechanism:**
    Iterates through Google Gemini models to guarantee 99.9% uptime and prevent service disruptions:
    1. `gemini-3.1-flash-lite` (Ultra-low latency, sub-3s response time)
    2. `gemini-3.1-flash-lite-preview`
    3. `gemini-3-flash-preview`
    4. `gemini-flash-latest`
  - **Timeout Safeguard:** Employs `AbortSignal.timeout(7000)` per attempt so lagging models fail fast and trigger fallback without freezing serverless instances.

---

## 🌐 Deployment & Hosting

| Component | Platform | Live URL | Repository |
| :--- | :--- | :--- | :--- |
| **Frontend** | Vercel / GitHub Pages | [Live Site](https://portfolio-frontend-one-henna.vercel.app) | `ShivamTech30/portfolio` |
| **Backend API** | Vercel Serverless Functions | [Backend API](https://portfolio-backend-livid-nine.vercel.app) | `ShivamTech30/portfilioBackend` |

### Environment Variables on Vercel:
- **Backend:**
  - `GEMINI_API_KEY`: Secret Google Gemini API Key configured for `Production` and `Preview` environments.
  - `ALLOWED_ORIGIN`: Comma-separated list of authorized frontend origins for CORS (e.g., `https://portfolio-frontend-one-henna.vercel.app,http://localhost:5173`). In development, localhost is permitted automatically.
  - `PORT`: (Optional) Backend port, default `5000`.
- **Frontend:**
  - `VITE_API_URL`: Set to `https://portfolio-backend-livid-nine.vercel.app` to connect the client to production API.

---

## 🛠️ Local Development Guide

### 1. Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)
- Google Gemini API Key

### 2. Backend Setup
```bash
cd portfolioBackend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY and ALLOWED_ORIGIN:
# GEMINI_API_KEY=your_actual_gemini_api_key
# PORT=5000
# ALLOWED_ORIGIN=https://portfolio-frontend-one-henna.vercel.app,http://localhost:5173

# Start backend dev server
npm run dev
# Server runs on http://localhost:5000

# Run automated AI chat test suite (~20 test cases)
npm test
# or: node tests/chat-test.js
```

### 3. Frontend Setup
```bash
cd portfolioFrontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Testing Endpoints
```bash
# Health check
curl http://localhost:5000/

# Test AI Chat
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Tell me about Shivam Sharma"}'
```

---

## 👨‍💻 Author

**Shivam Sharma**  
*Lead Frontend Developer | Senior React & Next.js Engineer*  
- **Email:** [shivamtech30@gmail.com](mailto:shivamtech30@gmail.com)  
- **LinkedIn:** [linkedin.com/in/shivam-sharma](https://linkedin.com/in/shivam-sharma)  
- **GitHub:** [github.com/ShivamTech30](https://github.com/ShivamTech30)  
