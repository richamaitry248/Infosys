import smtplib
from email.message import EmailMessage

def send_risk_alert(coin_name, risk_level):
    # 1. Create the message object
    msg = EmailMessage()
    msg['Subject'] = f"🚨 Crypto Alert: {coin_name}"
    msg['From'] = "richamaitry@gmail.com"
    msg['To'] = "richamaitry@gmail.com" # You can change this to your sister's email
    msg.set_content(f"Alert! The risk level for {coin_name} has changed to: {risk_level}")

    try:
        # 2. Connect and Send
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login("richamaitry@gmail.com", "laqr gifg bawd gryh")
            smtp.send_message(msg)
            print(f"✅ Alert sent for {coin_name}!")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

# This part tests the function
if __name__ == "__main__":
    # We use the SAME name here as the function above
    send_risk_alert("BITCOIN", "High Volatility (+2.5%)")