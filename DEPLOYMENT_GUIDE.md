# Legal AI - Deployment Guide

This guide will help you push your project to GitHub and deploy it to the web.

## 1. Push to GitHub

### Prerequisites
- You need a [GitHub account](https://github.com/).
- Git installed on your computer.

### Steps
1.  **Initialize Git**:
    Open your terminal in the project root (`Legal_AI`) and run:
    ```bash
    git init
    ```
2.  **Add Files**:
    ```bash
    git add .
    ```
3.  **Commit**:
    ```bash
    git commit -m "Initial commit"
    ```
4.  **Create a Repository on GitHub**:
    - Go to [GitHub.com/new](https://github.com/new).
    - Name your repository (e.g., `legal-ai`).
    - **Do not** initialize with README, .gitignore, or license (we already have them).
    - Click **Create repository**.

5.  **Link and Push**:
    Copy the commands under "…or push an existing repository from the command line" and run them. They will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/legal-ai.git
    git branch -M main
    git push -u origin main
    ```

---

## 2. Deploy Frontend (Vercel)

We will use **Vercel** to host the React frontend.

1.  Go to [Vercel](https://vercel.com/) and sign up with GitHub.
2.  Click **Add New...** -> **Project**.
3.  Import your `legal-ai` repository.
4.  **Configure Project**:
    - **Framework Preset**: Create React App (should be auto-detected).
    - **Root Directory**: Click `Edit` and select `frontend`.
    - **Environment Variables**: Add any variables from `frontend/.env` if you have them (e.g., `REACT_APP_API_URL`).
        - Set `REACT_APP_API_URL` to your backend URL (you will get this in the next section, so you might need to redeploy later).
5.  Click **Deploy**.

---

## 3. Deploy Backend (Render)

We will use **Render** to host the FastAPI backend.

1.  Go to [Render](https://render.com/) and sign up with GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your `legal-ai` repository.
4.  **Configure Service**:
    - **Name**: `legal-ai-backend` (or similar).
    - **Root Directory**: `backend`.
    - **Runtime**: `Python 3`.
    - **Build Command**: `pip install -r requirements.txt`.
    - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`.
5.  **Environment Variables**:
    Scroll down to "Environment Variables" and verify you add ALL secrets from your `backend/.env` file:
    - `OPENAI_API_KEY`: ...
    - `MONGO_URI`: ...
    - `SECRET_KEY`: ...
    - Any other keys you use.
6.  Click **Create Web Service**.

### Connecting Frontend to Backend
Once your backend is live on Render, copy its URL (e.g., `https://legal-ai-backend.onrender.com`).
1.  Go back to your Vercel project settings.
2.  Update the `REACT_APP_API_URL` environment variable to this new URL.
3.  Redeploy the frontend.
