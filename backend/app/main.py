from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.protected import router as protected_router
from app.api.pdf import router as pdf_router
from app.api.ai import router as ai_router




from app.api.auth import router as auth_router
from app.core.database import connect_to_mongo, close_mongo_connection

app = FastAPI(title="LegalAI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(protected_router)
app.include_router(pdf_router)
app.include_router(ai_router)





@app.on_event("startup")
async def startup():
    await connect_to_mongo(app)


@app.on_event("shutdown")
async def shutdown():
    await close_mongo_connection(app)


@app.get("/")
def root():
    return {"status": "Backend running"}
