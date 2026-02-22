from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from . import crud
from . import models
from . import schemas
from . import intelligence
response_model=schemas.AnalysisOutput
from .database import engine, Base, get_db
from .config import settings

# Create DB tables (for dev; in production use migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DevOps Demo API")

@app.get("/")
def root():
    return {"message": "DevOps Demo API"}

@app.post("/register", response_model=schemas.UserOut, status_code=201)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_user_by_email(db, user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)

@app.post("/login", response_model=schemas.UserOut)
def login(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

@app.get("/users/{user_id}", response_model=schemas.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    u = db.query(models.User).filter(models.User.id == user_id).first()
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return u

@app.post("/analyze", response_model=schemas.AnalysisOutput)
def analyze(data: schemas.AnalysisInput):
    tech_score = intelligence.calculate_technical_score(
        data.repo_data.dict()
    )

    cognitive_profile = intelligence.calculate_cognitive_profile(
        data.cognitive_test.dict()
    )

    recommendation = intelligence.generate_recommendation(
        tech_score,
        cognitive_profile["overall_cognitive_score"]
    )

    return {
        "technical_score": tech_score,
        "cognitive_profile": cognitive_profile,
        "recommended_career_path": recommendation
    }


