def check_risk(old_price, new_price):

    change_percentage = ((new_price - old_price) / old_price) * 100

    if change_percentage <= -5:
        return "HIGH RISK"

    elif change_percentage >= 5:
        return "UPTREND"

    else:
        return "STABLE"