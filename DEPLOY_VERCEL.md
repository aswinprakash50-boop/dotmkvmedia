# Deploying dotMKV Studio Dashboard to Vercel 🚀

This project is configured, optimized, and tested for instant zero-config deployment on **Vercel**.

---

## 🌟 Method 1: Deploy via GitHub & Vercel Dashboard (Recommended)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `dotmkv-dashboard`).

2. **Push your code to GitHub**:
   Run the following commands in your terminal:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dotmkv-dashboard.git
   git branch -M main
   git push -u origin main
   ```

3. **Import to Vercel**:
   - Open your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **"Add New..."** → **"Project"**.
   - Select your `dotmkv-dashboard` GitHub repository and click **Import**.
   - Vercel will automatically detect **Next.js**.
   - *(Optional)* In the **Environment Variables** section, you can customize:
     - `ADMIN_USERNAME`: your custom admin username (defaults to `admin`)
     - `ADMIN_PASSWORD`: your custom admin password (defaults to `admin`)
   - Click **Deploy**!

Within ~45 seconds, your dashboard will be live on a fast, global HTTPS URL (e.g. `https://dotmkv-dashboard.vercel.app`)!

---

## ⚡ Method 2: Deploy via Vercel CLI

1. Run Vercel CLI from this folder:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   - Log in to your Vercel account in the browser.
   - Link to an existing project or create a new one: **Yes**.
   - Project name: `dotmkv-dashboard`.
   - Settings: Leave defaults (Next.js automatically detected).
3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

---

## 🔐 Admin Authentication on Vercel

- **Default Credentials**:
  - **Username**: `admin`
  - **Password**: `admin`
- The login screen includes the one-click **"Default Credentials: admin / admin"** button.
- If you configure `ADMIN_USERNAME` and `ADMIN_PASSWORD` in the Vercel project settings under **Settings > Environment Variables**, those credentials will be used automatically.
