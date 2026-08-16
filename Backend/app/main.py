from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .models import Base
from .routes import (
    auth,
    search,
    comparisons
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "BillGPT Backend Running"}

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    search.router,
    prefix="/search",
    tags=["Search"]
)

app.include_router(
    comparisons.router,
    prefix="/comparisons",
    tags=["Comparisons"]
)