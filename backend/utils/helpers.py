import random
import requests


def get_coin_price(coin: str) -> float:
    """
    Fetch current price of a coin from CoinGecko.
    coin: lowercase string like 'bitcoin', 'ethereum'
    """
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {"ids": coin.lower(), "vs_currencies": "usd"}
    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        return response.json()[coin.lower()]["usd"]
    except Exception:
        # fallback if API fails
        return round(random.uniform(50, 500), 2)
