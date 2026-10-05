---
description: General rules and context for the Shivam Portfolio project
always_on: true
---

# Shivam's Portfolio

This project is a personal portfolio website for Shivam, a Lead Frontend Developer.

## Tech Stack
- **Frontend Framework**: React 18 with Vite
- **Routing**: React Router (`react-router-dom`)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js (`@react-three/fiber`, `@react-three/drei`)
- **State Management**: Redux Toolkit
- **Backend/API**: Netlify Functions (`netlify/functions/gemini-proxy.js`) used as a serverless proxy to interact with the Gemini API.

## Project Structure
- `src/components/`: Contains reusable React components.
- `src/components/ShivamAssistant.jsx`: An AI chat assistant component integrated into the site.
- `src/utils/`: Contains utility functions (e.g., `aiAssistant.js` for Gemini API calls and `speech.js` for Web Speech API).
- `netlify/functions/`: Serverless backend functions deployed to Netlify.

## Development Guidelines
- Always prioritize Tailwind CSS for styling instead of inline styles or custom CSS classes unless necessary.
- Use Framer Motion for complex animations and transitions.
- Maintain a clean and modern aesthetic suitable for a professional portfolio.
- Never expose the `GEMINI_API_KEY` in frontend code; it must only be used in the Netlify proxy function.
