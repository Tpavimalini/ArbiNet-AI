# ArbiNet-AI
ArbiNet AI is a next-generation AI-powered DeFi Smart Account designed to optimize liquidity management, automate yield farming, execute arbitrage, and protect assets in real-time. It leverages Safe Smart Accounts, AI-driven trading strategies, and multi-agent liquidity swarms to provide a fully autonomous and secure DeFi experience.

## Overview
This project introduces an AI-powered DeFi Smart Account with a **Multi-Agent Liquidity Swarm**, designed for **yield optimization, arbitrage, and treasury management** across multiple chains. It integrates **Safe Smart Accounts, AI agents, and flash loans** to enhance automated liquidity management.

### Features:
- **Personalized Portfolio Management** – AI-driven DeFi portfolio strategies.
- **Dynamic Asset Allocation** – Automated investment in staking, lending, and liquidity pools.
- **AI-Powered Risk Protection** – Monitoring liquidation risks, impermanent loss, and security threats.
- **Cross-Chain Arbitrage** – Smart contract-enabled arbitrage across multiple chains.
- **Automated Flash Loans** – Optimized yield execution using Aave and other protocols.
- **Secure & Efficient Transactions** – Integrates HOT Wallet SDK and Chain Abstraction.

## Tech Stack
- **Smart Contracts**: Solidity, Hardhat, Safe Smart Accounts, Aurora/NEAR.
- **AI Agents**: Python (FastAPI, Scikit-learn, NumPy), VeaxFlow AI.
- **Backend**: Web3.py, Flask/FastAPI.
- **Frontend**: React, TailwindCSS, HOT Wallet SDK.

---

## Installation & Setup
### Prerequisites
- **Node.js v18+**
- **Hardhat** for Solidity development
- **MetaMask & NEAR Wallet** for testing
- **Infura/Alchemy API key**

### Clone the Repository
```sh
git clone https://github.com/your-repo/defi-smart-account.git
cd defi-smart-account
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following:
```sh
INFURA_API_KEY=your_infura_key
ALCHEMY_API_KEY=your_alchemy_key
PRIVATE_KEY=your_wallet_private_key
AURORA_RPC_URL=https://testnet.aurora.dev
NEAR_ACCOUNT_ID=your_near_account
```

### Compile Smart Contracts
```sh
npx hardhat compile
```

### Deploy Smart Contracts (Aurora Testnet)
```sh
npx hardhat run scripts/deploySafeSmartAccount.js --network auroraTestnet
```

---

## Testing Instructions
### Smart Contract Testing
```sh
npx hardhat test
```

### Frontend Testing
```sh
cd frontend
npm install
npm start
```

### API Testing (Backend)
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**API Endpoints:**
- **Portfolio Data:** `GET /portfolio/<wallet_address>`
- **Arbitrage Execution:** `POST /arbitrage`

---

## Hackathon Sponsor Fulfillment
### Aurora: AI Agentic Chains Bounty
- **AI-powered liquidity management on Aurora Testnet/Mainnet**
- **Multi-agent execution for optimized DeFi strategies**
- **Cross-chain AI coordination for adaptive trading**

### Proximity Labs: Cross-Chain Trading Agents
- **Cross-chain arbitrage between Ethereum, Aurora, NEAR, Arbitrum, Polygon**
- **Smart contract-enabled arbitrage detection and execution**

### HOT Wallet Bounty
- **HOT Wallet SDK integrated for asset management**
- **Cross-chain token transfers via HOT Omni Bridge**

### Bitte: NEAR/EVM Chain Agent Bounty
- **Chain abstraction smart contract for seamless execution**
- **Optimized gas fees and execution speed across chains**

### VeaxFlow AI Agent - UX Optimization
- **Liquidity optimization with VeaxFlow AI integration**
- **AI-driven rebalancing and risk management**

---

## Roadmap & Future Enhancements
- **Deploy to NEAR Mainnet**
- **Enhanced AI strategies for dynamic yield optimization**
- **Further gas efficiency and MEV protection**

## License
This project is licensed under the MIT License.

