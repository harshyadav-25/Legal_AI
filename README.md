# ⚖️ LegalAI
> **Next-Gen Legal Assistance. Justice, Simplified.**

LegalAI is an intelligent legal assistant designed to simplify complex legal documents and provide instant answers to legal queries. Built with a modern "Ethereal" UI and powered by advanced LLMs (Groq/Llama 3), it empowers users to understand their legal standing with ease.

---

## ✨ Features

### 📄 **Smart Document Analysis**
- Upload legal contracts or agreements (PDF).
- Get instant **Summaries** in bullet points.
- **Risk Detection**: Identifies potential legal risks and classifies them as Low, Medium, or High.
- **Bilingual Support**: Get analysis results in **English** or **Hindi**.

### 🤖 **Legal Chatbot**
- Ask general legal questions in natural language.
- Receive accurate, context-aware answers based on Indian Penal Code (IPC) and other legal frameworks.
- Supports queries in English, Hindi, and Hinglish.

### 🎨 **Ethereal Modern UI**
- A stunning, responsive interface featuring:
  - **Glassmorphism**: Translucent cards and panels.
  - **Mesh Gradients**: Dynamic, soft backgrounds.
  - **Micro-interactions**: Smooth animations and transitions.

### 🔐 **Secure Authentication**
- User Signup and Login via JWT (JSON Web Tokens).
- Google Authentication UI integration (ready for backend OAuth).

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, CSS Modules (Glassmorphism design system).
- **Backend**: FastAPI (Python), Motor (MongoDB Async Driver).
- **AI Engine**: Groq API (Llama-3.1-8b-instant model).
- **Database**: MongoDB.
- **Tools**: `lucide-react` (Icons), `axios` (API requests).

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.9+
- MongoDB (Running locally or Atlas URI)
- Groq API Key

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with your credentials:
```ini
MONGO_URI=mongodb://localhost:27017
DB_NAME=ai_legal_sentinel
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

Run the server:
```bash
uvicorn app.main:app --reload
```

### 2. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
npm start
```
The app will open at `http://localhost:3000`.

---

## 📂 Project Structure

```
ai_legal_sentinel/
├── backend/            # FastAPI Server
│   ├── app/
│   │   ├── api/        # Routes (auth, ai, pdf)
│   │   ├── core/       # Config & Security
│   │   ├── models/     # Pydantic Schemas
│   │   ├── services/   # AI Logic (Groq, PDF extraction)
│   └── main.py         # Entry point
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI (Layout, Navbar)
│   │   ├── pages/      # Views (Home, Dashboard, Analysis)
│   │   ├── styles/     # Global CSS & Variables
│   │   └── services/   # API integration
```

---

## 🛡️ License
This project is for educational purposes. Legal advice provided by AI should be verified by professional counsel.
