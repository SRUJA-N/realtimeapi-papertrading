from fastapi import APIRouter, WebSocket
import asyncio
import random
import requests
from typing import Dict

from utils.helpers import get_coin_price

router = APIRouter()

active_tickers: Dict[str, Dict] = {}

@router.websocket("/ws/{ticker}")
async def websocket_endpoint(websocket: WebSocket, ticker: str):
    await websocket.accept()

    if ticker not in active_tickers:
        active_tickers[ticker] = {
            "price": get_coin_price(ticker),
            "volume": random.randint(10000, 50000)
        }

    try:
        while True:
            state = active_tickers[ticker]
            price = get_coin_price(ticker)
            change = price - state["price"]
            change_percent = round((change / state["price"]) * 100, 2)
            volume = max(0, state["volume"] + random.randint(-200, 300))

            active_tickers[ticker]["price"] = price
            active_tickers[ticker]["volume"] = volume

            await websocket.send_json({
                "stock": ticker.upper(),
                "price": price,
                "volume": volume,
                "change_percent": change_percent
            })

            await asyncio.sleep(1)

    except Exception as e:
        print(f"WebSocket Error for {ticker}: {e}")
    finally:
        print(f"Client for {ticker} disconnected")
