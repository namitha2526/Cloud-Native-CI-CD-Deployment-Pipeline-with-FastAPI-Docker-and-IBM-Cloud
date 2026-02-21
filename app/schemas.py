from pydantic import BaseModel, EmailStr
from typing import Optional, Dict

class UserCreate(BaseModel):
    email: EmailStr
    full_name: Optional[str]
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    is_active: bool

    class Config:
        orm_mode = True

class RepoData(BaseModel):
    num_languages: int
    avg_function_length: float
    num_repos: int
    commit_frequency: int


class CognitiveTest(BaseModel):
    abstraction: int
    debugging: int
    system_design: int
    optimization: int


class AnalysisInput(BaseModel):
    repo_data: RepoData
    cognitive_test: CognitiveTest


class AnalysisOutput(BaseModel):
    technical_score: float
    cognitive_profile: Dict
    recommended_career_path: str
