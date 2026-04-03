import threading

def analyze_coin(coin, prices, previous_prices, risk_checker, risk_data):

    new_price = prices[coin]
    old_price = previous_prices[coin]

    risk = risk_checker(old_price, new_price)

    risk_data[coin] = risk

    print(f"{coin} → {risk}")


def run_parallel_analysis(prices, previous_prices, risk_checker):

    threads = []
    risk_data = {}

    for coin in prices:

        thread = threading.Thread(
            target=analyze_coin,
            args=(coin, prices, previous_prices, risk_checker, risk_data)
        )

        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    return risk_data