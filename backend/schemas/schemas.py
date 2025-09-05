from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ------------------------------
# USER SCHEMAS
# ------------------------------

class UserCreate(BaseModel):
    """
    Schema for user signup.
    Validates email format and password confirmation.
    """
    email: EmailStr
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    """
    Schema for user login.
    Validates email and password.
    """
    email: EmailStr
    password: str

class Token(BaseModel):
    """
    JWT Token schema.
    """
    access_token: str
    token_type: str

class UserOut(BaseModel):
    """
    Schema for returning user info.
    """
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True  # Allow reading data from ORM models

# ------------------------------
# TRADE SCHEMAS
# ------------------------------

class TradeBase(BaseModel):
    """
    Base schema for creating a trade.
    """
    symbol: str           # Stock symbol
    trade_type: str       # BUY or SELL
    quantity: int         # Number of shares
    price: float          # Trade price

class Trade(TradeBase):
    """
    Schema for returning trade info.
    Inherits from TradeBase and adds metadata.
    """
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True  # Enable ORM model compatibility

# ------------------------------
# PORTFOLIO SCHEMA
# ------------------------------

class Portfolio(BaseModel):
    """
    Schema for returning portfolio holdings.
    """
    id: int
    user_id: int
    symbol: str
    quantity: int
    avg_price: float

    class Config:
        from_attributes = True  # Enable ORM model compatibility
