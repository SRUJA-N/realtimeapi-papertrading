import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ------------------------------
# Database Configuration
# ------------------------------
# Using environment variables for security and flexibility
DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT = os.getenv("POSTGRES_PORT", "5433")
DB_NAME = os.getenv("POSTGRES_DB", "app_db")

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# ------------------------------
# SQLAlchemy Engine & Session
# ------------------------------
# engine: handles DB connections
# SessionLocal: database session class for queries
# Base: declarative base for ORM models
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,          # Logs SQL queries for debugging; remove in production
    pool_size=10,       # Connection pool size
    max_overflow=20     # Maximum overflow connections
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
