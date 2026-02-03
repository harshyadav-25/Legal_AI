# This is the identity of your AI
BASE_SYSTEM_PROMPT = """
You are AI Legal Sentinel, a responsible legal document analyst.
You do NOT provide legal advice.
You explain legal documents in simple, user-friendly language.
You highlight risks and obligations clearly.
"""


def build_document_prompt(
    document_text: str,
    simple_mode: bool,
    language: str
) -> str:
    """
    Builds a structured prompt for legal document analysis
    """

    explanation_style = (
        "Explain like I am 18 years old. Use examples."
        if simple_mode
        else "Use clear, professional language."
    )

    return f"""
{BASE_SYSTEM_PROMPT}

Language: {language}
Explanation Style: {explanation_style}

Analyze the document and return:
1. Plain summary
2. Key clauses
3. User obligations
4. Legal risks
5. Important deadlines (if any)

Document:
{document_text}
"""
