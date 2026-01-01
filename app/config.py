from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    ENV: str = "development"
    SECRET_KEY: str = "change_me"
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000

    class Config:
        env_file = ".env"

settings = Settings()
