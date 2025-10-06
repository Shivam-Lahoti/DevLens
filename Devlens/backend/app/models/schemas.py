from pydantic import BaseModel
from typing import Optional

class ExplainPageRequest(BaseModel):
    url: str
    content: Optional[str]

class ExplainPageResponse(BaseModel):
    explanation: str

class ExplainCodeRequest(BaseModel):
    code: str

class ExplainCodeResponse(BaseModel):
    explanation: str

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] =None

class ChatResponse(BaseModel):
    response: str

class HealthResponse(BaseModel):
    status: str
    version: str


