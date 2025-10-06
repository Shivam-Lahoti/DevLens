from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    ExplainPageRequest,
    ExplainPageResponse,
    ExplainCodeRequest,
    ExplainCodeResponse,
    ChatRequest,
    ChatResponse,
    HealthResponse
)
from app.services.llm_services import llm_services
from app.services.extractor import content_extractor

router= APIRouter()

@router.get("/health", response_model= HealthResponse)
async def health_check():
    return HealthResponse(status="ok", version="1.0.0")

@router.post("/explain-page", response_model= ExplainPageResponse)
async def explain_page(request: ExplainPageRequest):
    try:
        content= request.content
        if not content:
            content= await content_extractor.fetch_page_content(request.url)
        
        explanation= await llm_services.explain_page(request.url, content)
        return ExplainPageResponse(explanation= explanation)
    
    except Exception as e:
        raise HTTPException(status_code= 500, detail= str(e))

@router.post("/explain_code", response_model= ExplainCodeResponse)
async def explain_code(request: ExplainCodeRequest):
    try:
        explanation= await llm_services.explain_code(request.code, request.language)
        return ExplainCodeResponse(explanation= explanation)
    
    except Exception as e:
        raise HTTPException(status_code= 500, detail= str(e))

@router.post("/chat", response_model= ChatResponse)
async def chat(request: ChatRequest):
    try:
        context= getattr(request, "context", None)
        response= await llm_services.chat(request.message, context)
        return ChatResponse(response= response)
    
    except Exception as e:
        raise HTTPException(status_code= 500, detail= str(e))