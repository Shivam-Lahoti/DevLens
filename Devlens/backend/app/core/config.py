from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Settings
    GEMINI_API_KEY: str
    ENVIRONMENT: str = "development"
    
    # CORS - now as a string
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    
    # Gemini Settings
    GEMINI_MODEL: str = "gemini-2.5-flash"
    MAX_TOKENS: int = 2048
    TEMPERATURE: float = 0.7
    
    # Convert ALLOWED_ORIGINS to list
    def get_allowed_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()