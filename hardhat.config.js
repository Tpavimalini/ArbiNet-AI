require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.19",
    networks: {
        auroraTestnet: {
            url: process.env.AURORA_TESTNET_RPC,
            accounts: [process.env.PRIVATE_KEY]
        },
        auroraMainnet: {
            url: process.env.AURORA_MAINNET_RPC,
            accounts: [process.env.PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    }
};
