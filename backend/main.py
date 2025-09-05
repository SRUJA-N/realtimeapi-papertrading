from fastapi import FastAPI, Depends, HTTPException, status, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Annotated, Dict
import asyncio
import random
import requests

from routers import auth, trade, portfolio, websocket
from config.database import engine, get_db
from models import models
from schemas import schemas
from config.settings import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(trade.router)
app.include_router(portfolio.router)
app.include_router(websocket.router)

models.Base.metadata.create_all(bind=engine)
