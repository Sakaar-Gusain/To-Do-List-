from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime

from database import engine, Base, get_db
import models, schemas
from auth import hash_password, verify_password

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Registration
@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.gmail == user.gmail).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        gmail=user.gmail,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message":"Account created successfully",
        "user_id":new_user.user_id,
        "gmail":new_user.gmail
    }


#Login 
@app.post("/login", response_model=schemas.UserResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.gmail == user.gmail).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return db_user


#Add task for selected day
@app.post("/users/{user_id}/tasks", response_model=schemas.TaskResponse)
def create_task(user_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    new_task = models.Information(
        user_id=user_id,
        day=task.day,
        task=task.task,
        add_time=datetime.utcnow(),
        complete_time=None
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


#Get all tasks for a user on a given day 
@app.get("/users/{user_id}/tasks/{day}", response_model=list[schemas.TaskResponse])
def get_tasks_by_day(user_id: int, day: schemas.DayEnum, db: Session = Depends(get_db)):
    tasks = db.query(models.Information).filter(
        models.Information.user_id == user_id,
        models.Information.day == day
    ).all()
    return tasks

#Mark task complete 
@app.patch("/tasks/{task_id}/complete", response_model=schemas.TaskResponse)
def complete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Information).filter(models.Information.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.complete_time = None if task.complete_time else datetime.utcnow()
    db.commit()
    db.refresh(task)
    return task


#Delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Information).filter(models.Information.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"detail": "Task deleted"}