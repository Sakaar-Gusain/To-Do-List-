from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

class DayEnum(str, enum.Enum):
    monday = "monday"
    tuesday = "tuesday"
    wednesday = "wednesday"
    thursday = "thursday"
    friday = "friday"
    saturday = "saturday"
    sunday = "sunday"

class User(Base):
    __tablename__ = "user_table"

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    gmail = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)  # store hashed password

    tasks = relationship("Information", back_populates="user")


class Information(Base):
    __tablename__ = "information_table"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user_table.user_id"), nullable=False)
    day = Column(Enum(DayEnum), nullable=False)
    task = Column(String(500), nullable=False)
    add_time = Column(DateTime, nullable=False)
    complete_time = Column(DateTime, nullable=True)  # null until completed

    user = relationship("User", back_populates="tasks")