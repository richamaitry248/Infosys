from config import investment_amount, usd_to_inr # type: ignore

portfolio_rules = {
    "BTCUSDT": 0.4,
    "ETHUSDT": 0.3,
    "SOLUSDT": 0.2,
    "ADAUSDT": 0.1
}

def calculate_mix():

    investment_distribution = {}

    for coin, ratio in portfolio_rules.items():

        amount_usd = investment_amount * ratio

        amount_inr = amount_usd * usd_to_inr

        investment_distribution[coin] = amount_inr

    return investment_distribution