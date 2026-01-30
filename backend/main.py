from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import os

# ----------------------------
# GROQ AI SETUP (SAFE)
# ----------------------------
try:
    from groq import Groq
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    GROQ_AVAILABLE = True
except Exception:
    GROQ_AVAILABLE = False
    client = None

# ----------------------------
# FASTAPI APP
# ----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# DATA MODEL
# ----------------------------
class Query(BaseModel):
    question: str
    language: str

# ----------------------------
# ROOT
# ----------------------------
@app.get("/")
def root():
    return {"status": "Backend running (Groq AI mode)"}

# ----------------------------
# ASK LEGAL QUESTION
# ----------------------------
@app.post("/ask")
def ask_legal_question(query: Query):

    fallback_answer = f"""
Simple Explanation:
This is a legal-related issue that requires awareness and timely action.

Applicable Law / Section:
Relevant Indian laws may apply depending on the situation.

Possible Penalty or Risk:
Delay or inaction may increase legal or financial risk.

Next Steps:
1. Understand the applicable law.
2. Take immediate corrective steps.
3. Consult authorities or professionals if needed.
"""

    if GROQ_AVAILABLE:
        try:
            prompt = f"""
You are an Indian legal assistant.
Answer in very SIMPLE language.

FORMAT:
1. Simple Explanation
2. Applicable Law / Section
3. Possible Penalty or Risk
4. Next Steps

Language: {query.language}
Question: {query.question}
"""
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
            )
            return {"answer": response.choices[0].message.content}
        except Exception:
            pass

    return {"answer": fallback_answer}

# ----------------------------
# PDF SUMMARIZER
# ----------------------------
@app.post("/upload-pdf")
def upload_pdf(
    file: UploadFile = File(...),
    language: str = Form("English")
):
    try:
        reader = PyPDF2.PdfReader(file.file)
        text = ""

        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"

        if not text.strip():
            return {"summary": "No readable text found in the PDF."}

        if GROQ_AVAILABLE:
            prompt = f"""
You are an Indian legal assistant.
Summarize the following legal document in VERY SIMPLE language.

Language: {language}

Text:
{text[:8000]}
"""
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
            )
            return {"summary": response.choices[0].message.content}

        return {
            "summary": "This document contains legal information. Please review important clauses carefully."
        }

    except Exception as e:
        return {"summary": f"Error processing PDF: {str(e)}"}

