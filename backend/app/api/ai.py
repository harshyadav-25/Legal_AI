from fastapi import APIRouter, Request, Depends
from app.core.auth_dependency import get_current_user
from app.services.ai_engine import analyze_legal_text

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/analyze-latest")
async def analyze_latest_pdf(
    request: Request,
    language: str = "English",
    current_user=Depends(get_current_user)
):
    db = request.app.state.db

    doc = await db.documents.find_one(
        {"user": current_user["email"]},
        sort=[("_id", -1)]
    )

    if not doc:
        return {"error": "No document found"}

    analysis = analyze_legal_text(doc["text"], language)

    return {
        "filename": doc["filename"],
        "analysis": analysis
    }

from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str

from app.services.llm_engine import llm_ask

@router.post("/ask")
async def ask_legal_question(request: QuestionRequest):
    answer = llm_ask(request.question)
    return {"answer": answer}
