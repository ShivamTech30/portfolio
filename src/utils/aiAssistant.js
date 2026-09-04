// Shivam Sharma AI Assistant Knowledge Base & Fallback Engine

export const SYSTEM_CONTEXT = `
You are "Shivam's AI Assistant", representing Shivam Sharma.

About Shivam Sharma:
- Professional Title: Lead Frontend Developer | Senior React & Next.js Engineer (5+ years of experience).
- Current Role: Lead Frontend Developer at NeoSOFT — Axis Mutual Fund (Client Engagement) since June 2025 in Mumbai, India.
- Current Key Responsibilities: Leading frontend delivery for Payment, Onboarding, STP, and Switch flows, mentoring a team of 4-5 frontend developers, maintaining a payment page handling ~10 lakh weekly user interactions, and optimizing load performance by ~40% via code splitting, memoization, and reduced re-renders in a monorepo architecture.
- Past Roles:
  1. Frontend Developer at Extern Labs (Jul 2022 – May 2025, Jaipur): Built NitroXpress (logistics platform with RBAC & payment gateway), Tipco (real-time IoT dashboard with WebSockets), NueGo/GreenCell Mobility (electric bus booking & corporate website), HarborBites (QR restaurant ordering with live KDS), Fintellir (stock analytics platform).
  2. Frontend Developer at Maitretech Solutions (Jun 2021 – Jun 2022, Bhopal): Built AirPMO construction management platform.
  3. Intern at Reliance Jio (Jun 2018 – Jul 2018): RF macro planning and optimization.
- Core Technical Skills: React.js, Next.js, TypeScript, JavaScript (ES6+), Redux, Redux Toolkit (RTK), TanStack Query, Context API, HTML5, CSS3, Tailwind CSS, Bootstrap, Material UI, REST APIs, GraphQL, WebSockets, Axios, Webpack, Vite, Git/GitHub, Jira, AWS S3, Node.js, MongoDB.
- Education: B.Tech in Computer Science, Arya Institute of Engineering and Technology, Jaipur (2015 – 2019); St. Mary's Convent Higher Secondary School, Bankhedi (2015).
- Achievements: 1st place in Extern Labs internal hackathon (built real-time collaboration tool using React and WebSockets).
- Contact Info: Email: shivamtech30@gmail.com | Phone: +91 8949157092 | LinkedIn: linkedin.com/in/shivam-sharma | Location: Mumbai, India.

Instructions:
- Be polite, concise, and helpful.
- Speak in first-person as Shivam's representative.
- Format your response with clear Markdown formatting (bullet points, bold text, code blocks when necessary).
`;

export const getSmartFallbackResponse = (query) => {
  const q = query.toLowerCase();

  // 1. About / Bio / Who is Shivam
  if (q.includes('who is') || q.includes('about') || q.includes('introduce') || q.includes('background') || q.includes('tell me about')) {
    return `### 👋 About Shivam Sharma
**Shivam Sharma** is a **Lead Frontend Developer** with **5+ years of experience** building high-performance, scalable web applications using **React.js, Next.js, and TypeScript**.

**Key Highlights:**
- 🏢 **Current Role**: Lead Frontend Developer at **NeoSOFT — Axis Mutual Fund (Client Engagement)** in Mumbai, India.
- ⚡ **Specialties**: Performant UI Systems, Monorepo Architecture, State Management (RTK, TanStack Query), Real-time WebSockets, and Performance Optimization.
- 🎯 **Scale**: Handles critical payment & onboarding flows serving **~10 lakh weekly user interactions**.
- 📍 **Location**: Mumbai, India
- 📬 **Email**: [shivamtech30@gmail.com](mailto:shivamtech30@gmail.com)`;
  }

  // 2. Experience / Current Job / Axis Mutual Fund
  if (q.includes('experience') || q.includes('work') || q.includes('company') || q.includes('axis') || q.includes('neosoft') || q.includes('extern') || q.includes('job')) {
    return `### 💼 Work Experience Overview (5+ Years)

1. **Lead Frontend Developer** | **NeoSOFT — Axis Mutual Fund** *(Jun 2025 – Present)*
   - **Location**: Mumbai, India
   - Leading a team of 4–5 frontend engineers across **Payment, Onboarding, STP, and Switch** flows.
   - Managing a high-traffic payment platform handling **~10 Lakh weekly user interactions**.
   - Improved page load and rendering performance by **~40%** via code-splitting and monorepo optimizations.

2. **Frontend Developer** | **Extern Labs** *(Jul 2022 – May 2025)*
   - **Location**: Jaipur, India
   - Engineered 5+ client applications: **NitroXpress** (logistics platform with RBAC & payment gateway), **Tipco** (real-time IoT monitoring with WebSockets), **NueGo/GreenCell Mobility** (booking platform), **HarborBites** (QR restaurant ordering), and **Fintellir** (stock analytics).

3. **Frontend Developer** | **Maitretech Solutions** *(Jun 2021 – Jun 2022)*
   - Engineered **AirPMO** — a multi-site construction management platform with zone-based permissions.

4. **Intern** | **Reliance Jio** *(Jun 2018 – Jul 2018)*
   - RF Macro Planning & Network Optimization.`;
  }

  // 3. Technical Skills / Tech Stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('react') || q.includes('next') || q.includes('typescript')) {
    return `### 🛠️ Technical Skills & Competencies

- **Core Frontend**: React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3
- **State Management**: Redux, Redux Toolkit (RTK), TanStack Query, Context API
- **Styling**: Tailwind CSS, Bootstrap, Material UI (MUI), Responsive UI/UX
- **Data & APIs**: REST APIs, GraphQL, WebSockets (Real-time), Axios, Fetch, Swagger
- **Architecture & Performance**: Monorepo Architecture, Code Splitting, Memoization, Render Optimization, Reduced Re-renders
- **Tools**: Webpack, Vite, Git & GitHub, Postman, Jira, Trello, AWS S3, VS Code
- **Backend (Working Knowledge)**: Node.js, Express.js, MongoDB`;
  }

  // 4. Projects
  if (q.includes('project') || q.includes('portfolio') || q.includes('build') || q.includes('built') || q.includes('greencell') || q.includes('nitro') || q.includes('tipco')) {
    return `### 🚀 Key Projects Built by Shivam

1. **Axis Mutual Fund (AxisMf)** — *Next.js, React.js, Monolith, Chart.js*
   - Digital investment platform for mutual funds, digital KYC, onboarding, and payment journeys serving millions of users.
   - 🌐 [Live Demo](https://www.axismf.com/)

2. **GreenCell Mobility (NueGo)** — *React.js, Tailwind CSS, Axios, Bootstrap*
   - Electric bus booking platform and complete corporate website for India's premier electric intercity bus service.
   - 🌐 [Live Demo](https://greencellmobility.com/)

3. **NitroXpress** — *React.js, Redux Toolkit, Bootstrap*
   - Third-party logistics management with role-based dashboards (Admin, B2B, B2C, Delivery) and in-app wallet.

4. **Tipco** — *React.js, TanStack Query, WebSockets*
   - Real-time IoT monitoring dashboard streaming vibration, motor rotation, and pressure metrics without page reload.

5. **HarborBites** — *React.js, Redux Toolkit, WebSockets, Tailwind CSS*
   - QR-based contactless restaurant ordering with a live Kitchen Display System (KDS).

6. **Fintellir** — *Next.js, Context API, Axios, Tailwind CSS*
   - Real-time stock and portfolio analytics platform.

7. **AirPMO** — *Next.js, Axios, Tailwind CSS*
   - Construction project management system with multi-role permissions.`;
  }

  // 5. Contact / Hire / Email / Phone
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('call') || q.includes('reach') || q.includes('linkedin') || q.includes('message')) {
    return `### 📬 Contact Shivam Sharma

Feel free to connect directly for job opportunities, consulting, or project collaborations:

- 📧 **Email**: [shivamtech30@gmail.com](mailto:shivamtech30@gmail.com)
- 📞 **Phone**: [+91 8949157092](tel:+918949157092)
- 💼 **LinkedIn**: [linkedin.com/in/shivam-sharma-a43326188/](https://www.linkedin.com/in/shivam-sharma-a43326188/)
- 🐙 **GitHub**: [github.com/ShivamTech30](https://github.com/ShivamTech30)
- 📍 **Location**: Mumbai, India (Open to Remote & Hybrid opportunities)`;
  }

  // 6. Resume / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
    return `### 📄 Resume / Curriculum Vitae

Shivam's resume is up-to-date with his latest **Lead Frontend Developer** experience.

- 📥 You can download his official CV directly by clicking the **"Download CV"** button in the Hero section of this website.
- Or request an updated copy via email: [shivamtech30@gmail.com](mailto:shivamtech30@gmail.com).`;
  }

  // 7. Education / Degree
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('btech') || q.includes('school')) {
    return `### 🎓 Education & Credentials

- **Bachelor of Technology (B.Tech) in Computer Science**
  - *Arya Institute of Engineering and Technology, Jaipur* (2015 – 2019)
- **Higher Secondary Certificate (HSC)**
  - *St. Mary's Convent Higher Secondary School, Bankhedi* (2015)
- **Achievements**:
  - 🏆 1st place in Extern Labs internal hackathon (built a real-time collaboration tool using React and WebSockets).`;
  }

  // Default response
  return `I can help you with anything about **Shivam Sharma**! Here are some common topics:

- 🏢 **Experience**: Leading frontend at Axis Mutual Fund, past work at Extern Labs & Maitretech.
- 🛠️ **Skills**: React.js, Next.js, TypeScript, Redux Toolkit, TanStack Query, Tailwind CSS, Monorepo architecture.
- 🚀 **Projects**: Axis Mutual Fund, GreenCell Mobility, NitroXpress, Tipco, HarborBites.
- 📬 **Contact**: Email [shivamtech30@gmail.com](mailto:shivamtech30@gmail.com) or Phone [+91 8949157092](tel:+918949157092).

Feel free to ask a specific question!`;
};

export const fetchAIResponse = async (userQuery) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyA5hdlGKKy82-a8rK_jzUo0DUDhotKXkas';

  const promptWithContext = `${SYSTEM_CONTEXT}\n\nUser Question: ${userQuery}`;
  const bodyContent = JSON.stringify({
    contents: [{ parts: [{ text: promptWithContext }] }]
  });

  const headersList = {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList
      }
    );

    if (response.ok) {
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    }
  } catch (err) {
    console.warn('Gemini API fetch failed, falling back to smart engine:', err);
  }

  // Fallback to intelligent built-in knowledge engine
  return getSmartFallbackResponse(userQuery);
};
