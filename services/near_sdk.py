from near_api import NearClient

NEAR_RPC_URL = "https://rpc.testnet.near.org"
client = NearClient(NEAR_RPC_URL)

def call_near_contract(contract_id, method_name, args):
    return client.call_function(contract_id, method_name, args)

