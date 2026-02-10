from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGODB_URL: str
    JWT_SECRET: str
    GROQ_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
print("GROQ KEY LOADED:", bool(settings.GROQ_API_KEY))

