import random
import requests

# Cache for last known prices to use as base for fluctuations when API fails
last_known_prices = {}

# Fallback base prices if no last known price exists
FALLBACK_PRICES = {
    "bitcoin": 100000,
    "ethereum": 3000,
    "ripple": 0.5,
    "litecoin": 100,
    "cardano": 0.5,
    # Add more coins as needed
}

def get_coin_price(coin: str) -> float:
    """
    Fetch current price of a coin from CoinGecko.
    If API fails, generate a price based on the last known price with random fluctuation.
    coin: lowercase string like 'bitcoin', 'ethereum'
    """
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {"ids": coin.lower(), "vs_currencies": "usd"}
    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        price = response.json()[coin.lower()]["usd"]
        # Update last known price
        last_known_prices[coin.lower()] = price
        return price
    except Exception:
        # Use last known price or fallback
        base_price = last_known_prices.get(coin.lower(), FALLBACK_PRICES.get(coin.lower(), 100))
        # Fluctuate price by +/- 5%
        fluctuation = base_price * 0.05
        simulated_price = base_price + random.uniform(-fluctuation, fluctuation)
        return round(simulated_price, 2)
