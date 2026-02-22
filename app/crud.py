from sqlalchemy.orm import Session

from . import models
from . import schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, full_name=user.full_name, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):
        return None
    return user
from . import models

def create_analysis(db, user_id, tech_score, cognitive_score, recommendation):
    analysis = models.Analysis(
        technical_score=tech_score,
        cognitive_score=cognitive_score,
        recommended_career_path=recommendation,
        user_id=user_id
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis

def get_user_analyses(db, user_id):
    return db.query(models.Analysis).filter(models.Analysis.user_id == user_id).all()
