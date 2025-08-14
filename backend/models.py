from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# ------------------------------
# USER MODEL
# ------------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)           # Primary key
    email = Column(String, unique=True, index=True, nullable=False)  # Unique email
    hashed_password = Column(String, nullable=False)            # Password hash
    created_at = Column(DateTime, default=datetime.utcnow)      # Account creation timestamp

    # Relationships
    portfolio = relationship(
        "Portfolio",
        back_populates="owner",
        cascade="all, delete-orphan"                            # Delete portfolio if user is deleted
    )
    trades = relationship(
        "Trade",
        back_populates="owner",
        cascade="all, delete-orphan"                            # Delete trades if user is deleted
    )

# ------------------------------
# PORTFOLIO MODEL
# ------------------------------
class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)           # Primary key
    user_id = Column(Integer, ForeignKey("users.id"))           # Link to User
    symbol = Column(String, index=True, nullable=False)         # Stock symbol
    quantity = Column(Integer, nullable=False)                  # Number of shares
    avg_price = Column(Float, nullable=False)                   # Average price of holding

    # Relationship
    owner = relationship("User", back_populates="portfolio")    # Link back to User

# ------------------------------
# TRADE MODEL
# ------------------------------
class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)           # Primary key
    user_id = Column(Integer, ForeignKey("users.id"))           # Link to User
    symbol = Column(String, index=True, nullable=False)         # Stock symbol
    trade_type = Column(String, nullable=False)                 # BUY or SELL
    quantity = Column(Integer, nullable=False)                  # Number of shares traded
    price = Column(Float, nullable=False)                       # Trade price
    timestamp = Column(DateTime, default=datetime.utcnow)       # Trade timestamp

    # Relationship
    owner = relationship("User", back_populates="trades")       # Link back to User
