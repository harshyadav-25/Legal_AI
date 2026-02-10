RISK_RULES = {
    "penalty": {
        "severity": "HIGH",
        "suggestion": "Review penalty clauses carefully. Consider negotiating caps."
    },
    "termination": {
        "severity": "HIGH",
        "suggestion": "Check termination conditions and notice periods."
    },
    "liability": {
        "severity": "HIGH",
        "suggestion": "Ensure liability is limited and clearly defined."
    },
    "indemnify": {
        "severity": "HIGH",
        "suggestion": "Indemnity clauses can create major risk. Seek legal advice."
    },
    "confidential": {
        "severity": "MEDIUM",
        "suggestion": "Verify confidentiality obligations and duration."
    },
    "non-compete": {
        "severity": "MEDIUM",
        "suggestion": "Non-compete clauses may restrict future work."
    },
    "fine": {
        "severity": "HIGH",
        "suggestion": "Check fine amounts and triggering conditions."
    },
    "breach": {
        "severity": "MEDIUM",
        "suggestion": "Understand breach definitions and remedies."
    }
}


def detect_risks(text: str):
    findings = []
    text_lower = text.lower()

    for keyword, rule in RISK_RULES.items():
        if keyword in text_lower:
            findings.append({
                "keyword": keyword,
                "severity": rule["severity"],
                "message": f"Clause related to '{keyword}' detected",
                "suggestion": rule["suggestion"]
            })

    return findings


def classify_document(text: str) -> str:
    t = text.lower()

    if "non-disclosure" in t or "confidential" in t:
        return "NDA"
    if "lease" in t or "rent" in t:
        return "Lease Agreement"
    if "employment" in t:
        return "Employment Agreement"
    if "agreement" in t:
        return "General Agreement"

    return "Unknown Document"


def summarize_text(text: str, limit: int = 5):
    sentences = [s.strip() for s in text.split(".") if len(s.strip()) > 30]
    return ". ".join(sentences[:limit])
