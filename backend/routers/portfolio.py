from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated

from models.models import User, Portfolio, Trade
from schemas.schemas import Portfolio as PortfolioSchema, Trade as TradeSchema
from config.database import get_db

from routers.auth import get_current_user

router = APIRouter()

@router.get("/portfolio", response_model=list[PortfolioSchema])
def get_portfolio(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    return db.query(Portfolio).filter_by(user_id=current_user.id).all()

@router.get("/trade-history", response_model=list[TradeSchema])
def get_trade_history(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    return db.query(Trade).filter_by(user_id=current_user.id).order_by(Trade.timestamp.desc()).all()
