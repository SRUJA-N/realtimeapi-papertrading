import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .settings import settings

# ------------------------------
# Database Configuration
# ------------------------------
# Using SQLite for development (easier setup)
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# ------------------------------
# SQLAlchemy Engine & Session
# ------------------------------
# engine: handles DB connections
# SessionLocal: database session class for queries
# Base: declarative base for ORM models
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,          # Logs SQL queries for debugging; remove in production
    connect_args={"check_same_thread": False}  # Needed for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ------------------------------
# Dependency: get_db
# ------------------------------
# Provides a database session to FastAPI endpoints and ensures proper cleanup
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
