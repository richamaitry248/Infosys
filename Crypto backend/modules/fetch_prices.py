from binance.client import Client
from config import coins 
import requests

client = Client()

def get_live_data():
   
    # 1. Get Live Exchange Rate
    try:
        ex_res = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=5)
        usd_to_inr = ex_res.json()['rates']['INR']
    except:
        usd_to_inr = 83.15 

    results = {}

    try:
        for symbol in coins:
            # A. Get Current Ticker Price
            ticker = client.get_symbol_ticker(symbol=symbol)
            current_usd = float(ticker["price"])

            # B. NEW: Get 24h Historical "Klines" (Candlesticks)
            # Fetching the first 'Open' price from 24 hours ago
            klines = client.get_historical_klines(symbol, Client.KLINE_INTERVAL_1DAY, "1 day ago UTC")
            historical_usd = float(klines[0][1]) # Index 1 is the 'Open' price

            results[symbol] = {
                "current_inr": round(current_usd * usd_to_inr, 2),
                "historical_inr": round(historical_usd * usd_to_inr, 2),
                "change_percent": round(((current_usd - historical_usd) / historical_usd) * 100, 2)
            }
        return results

    except Exception as e:
        print(f"⚠️ Binance History Error: {e}")
        return None

# Keep the original function name for compatibility with your existing code
def get_prices():
    data = get_live_data()
    if data:
        # Return just the current prices to keep app.py working
        return {sym: val["current_inr"] for sym, val in data.items()}
    return {"BTCUSDT": 6600000, "ETHUSDT": 300000, "SOLUSDT": 15000, "ADAUSDT": 60}
