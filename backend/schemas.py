from pydantic import BaseModel, EmailStr,Field
from datetime import datetime
from typing import Optional
from enum import Enum

class DayEnum(str, Enum):
    monday = "monday"
    tuesday = "tuesday"
    wednesday = "wednesday"
    thursday = "thursday"
    friday = "friday"
    saturday = "saturday"
    sunday = "sunday"

# ---- User schemas ----
class UserCreate(BaseModel):
    gmail: EmailStr
    password: str=Field(min_length=6,max_length=20)

class UserLogin(BaseModel):
    gmail: EmailStr
    password: str

class UserResponse(BaseModel):
    user_id: int
    gmail: EmailStr

    class Config:
        from_attributes = True  # lets it read directly from SQLAlchemy models


# ---- Task schemas ----
class TaskCreate(BaseModel):
    day: DayEnum
    task: str

class TaskResponse(BaseModel):
    id: int
    user_id: int
    day: DayEnum
    task: str
    add_time: datetime
    complete_time: Optional[datetime] = None

    class Config:
        from_attributes = True