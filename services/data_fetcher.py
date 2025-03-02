import requests

AAVE_API = "https://api.aave.com/data"
UNISWAP_API = "https://api.uniswap.org/v1/market"

def fetch_aave_rates():
    response = requests.get(AAVE_API)
    return response.json()

def fetch_uniswap_liquidity():
    response = requests.get(UNISWAP_API)
    return response.json()

