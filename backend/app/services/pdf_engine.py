import pdfplumber


class PDFEngine:
    """
    Responsible for extracting text from PDF documents
    """

    @staticmethod
    def extract_text(file) -> str:
        extracted_text = ""

        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text() or ""

        return extracted_text.strip()
