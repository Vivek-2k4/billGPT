from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


class SearchRequest(BaseModel):
    query: str


class ComparisonCreate(BaseModel):
    query: str
    best_source: str
    best_price: float


class ComparisonResponse(BaseModel):
    id: int
    user_id: int
    query: str
    best_source: str
    best_price: float

    class Config:
        from_attributes = True