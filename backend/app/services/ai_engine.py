from groq import Groq

from app.core.config import settings
from app.core.prompts import build_document_prompt


class AILegalEngine:
    """
    Central AI engine for AI Legal Sentinel
    """

    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)

    def analyze_document(
        self,
        document_text: str,
        simple_mode: bool = False,
        language: str = "English",
    ) -> str:
        """
        Sends document text to AI and returns structured analysis
        """

        prompt = build_document_prompt(
            document_text=document_text,
            simple_mode=simple_mode,
            language=language,
        )

        response = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a legal AI assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
        )

        return response.choices[0].message.content
