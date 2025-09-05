from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated

from models.models import User, Portfolio, Trade
from schemas.schemas import TradeBase
from config.database import get_db

from routers.auth import get_current_user

router = APIRouter()

@router.post("/trade")
def trade(
    trade: TradeBase,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    cost = trade.quantity * trade.price

    if trade.trade_type.upper() == "BUY":
        holding = db.query(Portfolio).filter_by(
            user_id=current_user.id, symbol=trade.symbol
        ).first()
        if holding:
            total_cost = holding.quantity * holding.avg_price + cost
            holding.quantity += trade.quantity
            holding.avg_price = total_cost / holding.quantity
        else:
            holding = Portfolio(
                user_id=current_user.id,
                symbol=trade.symbol,
                quantity=trade.quantity,
                avg_price=trade.price
            )
            db.add(holding)

    elif trade.trade_type.upper() == "SELL":
        holding = db.query(Portfolio).filter_by(
            user_id=current_user.id, symbol=trade.symbol
        ).first()
        if not holding or holding.quantity < trade.quantity:
            raise HTTPException(status_code=400, detail="Not enough shares to sell")
        holding.quantity -= trade.quantity
        if holding.quantity == 0:
            db.delete(holding)
    else:
        raise HTTPException(status_code=400, detail="Invalid trade type")

    new_trade = Trade(
        user_id=current_user.id,
        symbol=trade.symbol,
        trade_type=trade.trade_type.upper(),
        quantity=trade.quantity,
        price=trade.price
    )
    db.add(new_trade)
    db.commit()
    return {"message": f"{trade.trade_type} executed successfully"}
