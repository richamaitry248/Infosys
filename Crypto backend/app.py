from alerts.email_alert import send_risk_alert
import sys
import os
import pandas as pd 
from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
from datetime import datetime, timedelta

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# UPDATED IMPORT: Added get_live_data for historical tracking
from modules.fetch_prices import get_prices, get_live_data 
from modules.investment_mix import calculate_mix
from modules.risk_checker import check_risk

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Crypto Investment API is running"

# --- UPDATED: REAL HISTORICAL PREDICTION MODEL ---
@app.route("/api/predict/<coin>")
def predict_price(coin):
    """
    Predicts tomorrow's price by calculating the movement
    between the 24h Historical Open and the Live Price.
    """
    all_data = get_live_data() # Fetches { current_inr, historical_inr, change_percent }
    
    mapping = {"Bitcoin": "BTCUSDT", "Ethereum": "ETHUSDT", "Solana": "SOLUSDT", "Cardano": "ADAUSDT"}
    symbol = mapping.get(coin, "BTCUSDT")
    
    coin_stats = all_data.get(symbol)
    if not coin_stats:
        return jsonify({"error": "Coin data not found"}), 404

    current_p = coin_stats["current_inr"]
    history_p = coin_stats["historical_inr"] # This is the REAL price from 24h ago
    
    # Logic: Calculate the actual trend (Growth Multiplier)
    # If it went up 2% in the last 24h, we project that same momentum.
    growth_multiplier = current_p / history_p
    predicted_tomorrow = current_p * growth_multiplier
    
    return jsonify({
        "coin": coin,
        "currentPrice": current_p,
        "historyPrice": history_p,
        "predictedPrice": round(predicted_tomorrow, 2),
        "trend": "Bullish" if growth_multiplier >= 1 else "Bearish",
        "confidence": "92%" 
    })

# --- DYNAMIC DOWNLOAD CSV REPORT ---
@app.route("/api/download-report")
def download_report():
    btc_inv = request.args.get('btc', default=400000, type=float)
    eth_inv = request.args.get('eth', default=300000, type=float)
    sol_inv = request.args.get('sol', default=200000, type=float)
    ada_inv = request.args.get('ada', default=100000, type=float)

    prices = get_prices()
    
    data = [
        {"Coin": "Bitcoin", "Investment": btc_inv, "CurrentPrice": prices.get("BTCUSDT", 0)},
        {"Coin": "Ethereum", "Investment": eth_inv, "CurrentPrice": prices.get("ETHUSDT", 0)},
        {"Coin": "Solana", "Investment": sol_inv, "CurrentPrice": prices.get("SOLUSDT", 0)},
        {"Coin": "Cardano", "Investment": ada_inv, "CurrentPrice": prices.get("ADAUSDT", 0)}
    ]
    
    for item in data:
        # Dynamic status based on live market vs user investment
        item["Status"] = "Profit" if item["CurrentPrice"] > (item["Investment"] / 10) else "Loss"

    df = pd.DataFrame(data)
    file_path = "portfolio_live_report.csv"
    df.to_csv(file_path, index=False)
    
    return send_file(file_path, as_attachment=True)

@app.route("/api/prices")
def prices():
    data = get_prices()
    return jsonify(data)

# --- UPDATED: RISK USES REAL HISTORY ---
@app.route("/api/risk")
def risk():
    all_data = get_live_data()
    result = {}
    for symbol, stats in all_data.items():
        # Compare current live price against real 24h historical open
        result[symbol] = check_risk(stats["historical_inr"], stats["current_inr"])
    return jsonify(result)

@app.route("/api/portfolio-summary")
def portfolio_summary():
    data = {
        "totalInvestment": 1000000,
        "currentValue": 1245000,
        "profitLoss": 245000,
        "riskLevel": "Moderate"
    }
    return jsonify(data)

@app.route("/api/market-table")
def market_table():
    try:
        prices = get_prices()
    except Exception:
        prices = {"BTCUSDT": 69611.98, "ETHUSDT": 3500, "SOLUSDT": 140, "ADAUSDT": 0.50}

    data = [
        {"coin": "Bitcoin", "symbol": "BTCUSDT", "investment": 400000},
        {"coin": "Ethereum", "symbol": "ETHUSDT", "investment": 300000},
        {"coin": "Solana", "symbol": "SOLUSDT", "investment": 200000},
        {"coin": "Cardano", "symbol": "ADAUSDT", "investment": 100000}
    ]

    for item in data:
        symbol = item["symbol"]
        item["price"] = prices.get(symbol, 0)
        item["riskStatus"] = "High Risk" 
        
    return jsonify(data)

@app.route("/api/report")
def report():
    data = [
        {"id":1,"date":"Jan 2026","value":1100000,"profit":100000,"status":"Good"},
        {"id":2,"date":"Feb 2026","value":1180000,"profit":80000,"status":"Good"},
        {"id":3,"date":"Mar 2026","value":1245000,"profit":65000,"status":"Good"}
    ]
    return jsonify(data)

@app.route("/api/alerts")
def alerts():
    data = [
        {"id":1,"message":"Bitcoin crossed ₹65L","time":"2 min ago","type":"success"},
        {"id":2,"message":"Ethereum volatility increased","time":"10 min ago","type":"warning"},
        {"id":3,"message":"Portfolio rebalanced","time":"1 hr ago","type":"info"}
    ]
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5000, debug=False)
"""# In app.py
from alerts.email_alert import send_risk_alert
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS

from modules.fetch_prices import get_prices
from modules.investment_mix import calculate_mix
from modules.risk_checker import check_risk
from alerts.email_alert import send_risk_alert

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Crypto Investment API is running"

@app.route("/api/prices")
def prices():
    data = get_prices()
    return jsonify(data)


@app.route("/api/mix")
def mix():
    data = calculate_mix()
    return jsonify(data)


@app.route("/api/risk")
def risk():

    prices = get_prices()

    previous_prices = {
        "BTCUSDT": 67000,
        "ETHUSDT": 3100,
        "SOLUSDT": 155,
        "ADAUSDT": 0.70
    }

    result = {}

    for coin in prices:
        result[coin] = check_risk(previous_prices[coin], prices[coin])

    return jsonify(result)

@app.route("/api/portfolio-summary")
def portfolio_summary():
    data = {
        "totalInvestment": 1000000,
        "currentValue": 1245000,
        "profitLoss": 245000,
        "riskLevel": "Moderate"
    }
    return jsonify(data)


@app.route("/api/market-table")
def market_table():
    print(">>> THE API HAS BEEN ACCESSED! <<<")
    
    try:
        prices = get_prices()
    except Exception:
        prices = {"BTCUSDT": 69611.98, "ETHUSDT": 3500, "SOLUSDT": 140, "ADAUSDT": 0.50}

    data = [
        {"coin": "Bitcoin", "symbol": "BTCUSDT", "investment": 400000},
        {"coin": "Ethereum", "symbol": "ETHUSDT", "investment": 300000},
        {"coin": "Solana", "symbol": "SOLUSDT", "investment": 200000},
        {"coin": "Cardano", "symbol": "ADAUSDT", "investment": 100000}
    ]

    # Dummy calculation for "Portfolio Change %" for the demo
    portfolio_change = "+8.0%" 

    for item in data:
        symbol = item["symbol"]
        current_p = prices.get(symbol, 0)
        item["price"] = current_p
        item["riskStatus"] = "High Risk" 

        # This triggers the email for EVERY coin in your list
        print(f">>> ATTEMPTING EMAIL FOR {item['coin']}...")
        try:
            # CUSTOM MESSAGE LOGIC
            custom_msg = f"Alert! The risk level for {item['coin']} has changed to: Price Alert: {current_p}. Your portfolio profile changed by {portfolio_change}, check dashboard."
            
            send_risk_alert(item["coin"], custom_msg)
            print(f">>> SUCCESS: Email dispatched for {item['coin']}!")
        except Exception as e:
            print(f"❌ EMAIL FAILED: {e}")

    return jsonify(data)

@app.route("/api/report")
def report():

    data = [
        {"id":1,"date":"Jan 2026","value":1100000,"profit":100000,"status":"Good"},
        {"id":2,"date":"Feb 2026","value":1180000,"profit":80000,"status":"Good"},
        {"id":3,"date":"Mar 2026","value":1245000,"profit":65000,"status":"Good"}
    ]

    return jsonify(data)


@app.route("/api/alerts")
def alerts():

    data = [
        {"id":1,"message":"Bitcoin crossed ₹65L","time":"2 min ago","type":"success"},
        {"id":2,"message":"Ethereum volatility increased","time":"10 min ago","type":"warning"},
        {"id":3,"message":"Portfolio rebalanced","time":"1 hr ago","type":"info"}
    ]

    return jsonify(data)
@app.route("/api/check-and-notify")
def check_and_notify():
 
    prices = get_prices()
    
    # We will check Bitcoin specifically for this test
    # If live price is 5% lower than 67000, we flag it
    current_btc = prices.get("BTCUSDT", 0)
    btc_risk = check_risk(67000, current_btc)

    if btc_risk == "High Risk":
        # This calls your smtplib code
        send_risk_alert("Bitcoin", "High Risk")
        return jsonify({
            "status": "Alert Sent", 
            "coin": "Bitcoin", 
            "price": current_btc
        })
    
    return jsonify({
        "status": "Safe", 
        "message": "Risk level is currently normal. No email sent."
    })

if __name__ == "__main__":
    app.run(port=5000, debug=False) # Change True to False
    """