def apply_diversification_rules(mix):

    diversified_mix = mix.copy()

    total_investment = sum(diversified_mix.values())

    for coin in diversified_mix:

        ratio = diversified_mix[coin] / total_investment

        if ratio > 0.5:

            print(f"\n⚠ {coin} exceeds diversification limit!")

            diversified_mix[coin] = total_investment * 0.4

    return diversified_mix