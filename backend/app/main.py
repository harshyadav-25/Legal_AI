from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# MongoDB connection handlers
from app.core.database import connect_to_mongo, close_mongo_connection

# -----------------------------
# FastAPI App Initialization
# -----------------------------
app = FastAPI(
    title="AI Legal Sentinel",
    description="AI-powered legal document analysis platform",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend later (Vercel)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Application Events
# -----------------------------
@app.on_event("startup")
async def startup_event():
    connect_to_mongo()
    print("MongoDB connected successfully")

@app.on_event("shutdown")
async def shutdown_event():
    close_mongo_connection()
    print("MongoDB connection closed")

# -----------------------------
# Health Check Route
# -----------------------------
@app.get("/")
def health_check():
    return {
        "status": "running",
        "service": "AI Legal Sentinel Backend"
    }
