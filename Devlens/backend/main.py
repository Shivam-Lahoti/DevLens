from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router

app= FastAPI(
    title="DevLens API",
    description="Backend API for an AI-powered dev browser",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router,prefix="/api/v1")

@app.get("/")
async def root():
    return{
        "message": "Welcome to DevLens API",
        "version": "1.0.0",
        "status": "running"
    }


if __name__== "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

    
