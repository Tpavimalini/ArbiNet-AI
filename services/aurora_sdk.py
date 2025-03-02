from web3 import Web3

AURORA_RPC_URL = "https://testnet.aurora.dev"
web3 = Web3(Web3.HTTPProvider(AURORA_RPC_URL))

def get_gas_price():
    return web3.eth.gas_price

def call_contract(contract_address, abi, function_name, args):
    contract = web3.eth.contract(address=contract_address, abi=abi)
    return contract.functions[function_name](*args).call()

