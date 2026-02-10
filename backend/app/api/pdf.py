import os
import uuid
from fastapi import APIRouter, UploadFile, File, Depends, Request
from app.core.auth_dependency import get_current_user
from app.services.pdf_engine import extract_text_from_pdf

router = APIRouter(prefix="/pdf", tags=["PDF"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(
    request: Request,
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files allowed"}

    unique_name = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = extract_text_from_pdf(file_path)

    db = request.app.state.db
    await db.documents.insert_one({
        "user": current_user["email"],
        "filename": file.filename,
        "stored_as": unique_name,
        "text": extracted_text
    })

    return {
        "message": "PDF uploaded successfully",
        "text_preview": extracted_text[:500]
    }
