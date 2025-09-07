from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus

from .settings import settings

# ------------------------------
# Database Configuration
# ------------------------------
# Using PostgreSQL for production and development with Docker
SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{settings.POSTGRES_USER}:"
    f"{quote_plus(settings.POSTGRES_PASSWORD)}@"
    f"{settings.POSTGRES_HOST}:"
    f"{settings.POSTGRES_PORT}/"
    f"{settings.POSTGRES_DB}"
)

# ------------------------------
# SQLAlchemy Engine & Session
# ------------------------------
# engine: handles DB connections
# SessionLocal: database session class for queries
# Base: declarative base for ORM models
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,          # Logs SQL queries for debugging; remove in production
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
