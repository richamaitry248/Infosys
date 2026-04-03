import csv

def generate_report(prices, mix, risk_data):

    file_path = "reports/crypto_report.csv"

    with open(file_path, mode="w", newline="") as file:

        writer = csv.writer(file)

        writer.writerow(["Coin", "Price", "Investment (INR)", "Risk Status"])

        for coin in prices:

            writer.writerow([
                coin,
                prices[coin],
                round(mix[coin], 2),
                risk_data[coin]
            ])

    print("\nCSV Report Generated Successfully!")