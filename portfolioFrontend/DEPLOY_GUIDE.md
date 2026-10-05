# 🚀 Deployment Guide (Manual & Automatic)

This guide explains how to deploy your portfolio using terminal commands.

---

## ⚡ Method 1: Automatic Deployment (GitHub Actions - Recommended)

Whenever you push changes to the `main` branch, GitHub Actions will automatically build and deploy the project.

### Terminal Commands:
```bash
# 1. Stage your changes
git add .

# 2. Commit your changes
git commit -m "Your commit message"

# 3. Push to GitHub main branch
git push origin main
```

> **Note:** In **GitHub Repo > Settings > Pages**, make sure **Source** is set to **`GitHub Actions`**.

---

## 🛠️ Method 2: Manual Deployment via Terminal (`gh-pages`)

If you want to manually build and push directly to the `gh-pages` branch from your terminal:

### Terminal Commands:
```bash
# 1. Build the production bundle
npm run build

# 2. Deploy dist folder to gh-pages branch
npm run deploy
```

> **Note:** If using this method, go to **GitHub Repo > Settings > Pages**, and set:
> - **Source**: `Deploy from a branch`
> - **Branch**: `gh-pages` / `/ (root)`

---

## 🔑 GitHub Authentication (If `git push` or `npm run deploy` Fails)

If the terminal asks for your username and password:

1. Go to GitHub: **Settings > Developer Settings > Personal Access Tokens > Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name, select expiration (e.g., 90 days or No expiration), and check:
   - ✅ `repo` (Full control of private/public repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Click **Generate token** and copy the token (`ghp_...`).
5. In your terminal:
   - **Username**: `ShivamTech30`
   - **Password**: Paste your copied **Personal Access Token** (NOT your GitHub account password).

---

## 🌐 Live URL
Your portfolio will be available at:
👉 **https://ShivamTech30.github.io/portfolio/**
