import sqlite3
from datetime import datetime

# create database connection
conn = sqlite3.connect("data/crypto.db")
cursor = conn.cursor()

# create table if not exists
cursor.execute("""
CREATE TABLE IF NOT EXISTS prices(
coin TEXT,
price REAL,
time TEXT
)
""")

def save_price(coin, price):

    cursor.execute(
        "INSERT INTO prices VALUES (?,?,?)",
        (coin, price, str(datetime.now()))
    )

    conn.commit()