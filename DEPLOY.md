# Deployment Guide for Radio-Base Nexus

This guide outlines the steps to deploy the **Radio-Base** application. Use **Render** for the Java Spring Boot Backend and **Vercel** for the Next.js Frontend.

## Prerequisites

1.  **Push Code to GitHub**: Ensure your latest code (including this file) is pushed to your GitHub repository.
2.  **Add Creator Image**: 
    *   Save your photo as `rudransh.jpg`.
    *   Place it inside the `Frontend/public/` folder.
    *   Commit and push this change.

---

## Part 1: Deploy Backend (Render)

We will deploy the Spring Boot backend using Docker on Render.

1.  **Sign Up/Login**: Go to [render.com](https://render.com) and log in.
2.  **Create New Web Service**:
    *   Click **"New +"**.
    *   Select **"Web Service"**.
    *   Connect your **GitHub** account and select the **Radio-Base** repository.
3.  **Configure Service**:
    *   **Name**: `radio-base-backend` (or similar).
    *   **Root Directory**: `Backend` (Important: Type this exactly).
    *   **Runtime**: **Docker**.
    *   **Region**: Choose strictly (e.g., Singapore or Frankfurt).
    *   **Instance Type**: Free (or Starter).
4.  **Deploy**:
    *   Click **"Create Web Service"**.
    *   Render will start building your Docker image. This may take 5-10 minutes.
5.  **Get URL**:
    *   Once deployed, copy the **onrender.com URL** (e.g., `https://radio-base-backend.onrender.com`). You will need this for the frontend.

---

## Part 2: Deploy Frontend (Vercel)

We will deploy the Next.js frontend on Vercel.

1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and log in.
2.  **Add New Project**:
    *   Click **"Add New..."** -> **"Project"**.
    *   Import the **Radio-Base** repository.
3.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `Frontend`.
4.  **Environment Variables**:
    *   Expand the **"Environment Variables"** section.
    *   Add a new variable:
        *   **Key**: `BACKEND_URL`
        *   **Value**: Paste your Render Backend URL (e.g., `https://radio-base-backend.onrender.com`). **Do not add a trailing slash**.
5.  **Deploy**:
    *   Click **"Deploy"**.
    *   Vercel will build and deploy your site in less than a minute.

---

## Verification

1.  Open your **Vercel URL**.
2.  The application should load.
3.  Allow **Location Access** when prompted to fetch satellite data.
4.  Navigate to the **Creator** page via the Navbar to see your profile.

**Troubleshooting:**
*   **Backend 404/500**: Check Render logs. Ensure the Docker build finished successfully.
*   **Frontend API Errors**: Ensure the `BACKEND_URL` in Vercel is correct (no trailing slash) and the Backend is waking up (Free tier on Render sleeps after inactivity; first request might take 50s).
