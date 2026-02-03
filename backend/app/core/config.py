from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AI Legal Sentinel"
    APP_ENV: str = "development"

    JWT_SECRET: str
    MONGODB_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
