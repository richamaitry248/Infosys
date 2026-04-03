from modules.diversification import apply_diversification_rules
from modules.fetch_prices import get_prices
from modules.investment_mix import calculate_mix
from modules.risk_checker import check_risk 
from modules.parallel_processor import run_parallel_analysis
from reports.report_generator import generate_report

print("\nFetching live crypto prices...\n")

prices = get_prices()

for coin, price in prices.items():
    print(coin, ":", price)

print("\nRecommended Investment Mix (INR):\n")

mix = calculate_mix()
mix = apply_diversification_rules(mix)

for coin, amount in mix.items():
    print(coin, "→ ₹", round(amount,2))

print("\nRisk Analysis:\n")

previous_prices = {
    "BTCUSDT": 67000,
    "ETHUSDT": 3100,
    "SOLUSDT": 155,
    "ADAUSDT": 0.70
}

print("\nRisk Analysis (Parallel Processing):\n")

risk_data = run_parallel_analysis(prices, previous_prices, check_risk)

# Generate CSV Report
generate_report(prices, mix, risk_data)