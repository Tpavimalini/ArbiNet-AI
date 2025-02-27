from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.services.near_sdk import NearSDK
from backend.services.aurora_sdk import AuroraSDK
from backend.agents.portfolio_manager import PortfolioManager
from backend.agents.risk_mitigator import RiskMitigator
from backend.agents.trading_executor import TradingExecutor
from backend.agents.yield_optimizer import YieldOptimizer
from backend.services.notification_service import NotificationService

app = FastAPI(title="CC-DeFiGuard API", version="1.0")

# Initialize services
near_sdk = NearSDK()
aurora_sdk = AuroraSDK()
portfolio_manager = PortfolioManager()
risk_mitigator = RiskMitigator()
trading_executor = TradingExecutor()
yield_optimizer = YieldOptimizer()
notification_service = NotificationService()

# Request models
class TradeRequest(BaseModel):
    asset: str
    amount: float
    action: str  # "buy" or "sell"

class PortfolioRequest(BaseModel):
    user_id: str
    risk_level: str  # "low", "medium", "high"

@app.get("/")
def root():
    return {"message": "Welcome to CC-DeFiGuard API"}

@app.post("/trade/")
def execute_trade(request: TradeRequest):
    try:
        result = trading_executor.execute_trade(request.asset, request.amount, request.action)
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/portfolio/")
def optimize_portfolio(request: PortfolioRequest):
    try:
        allocation = portfolio_manager.optimize_allocation(request.user_id, request.risk_level)
        return {"status": "success", "allocation": allocation}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/risk-monitor/")
def monitor_risk():
    risks = risk_mitigator.analyze_risks()
    return {"status": "success", "risks": risks}

@app.get("/yield/")
def optimize_yield():
    yield_data = yield_optimizer.optimize_yield()
    return {"status": "success", "yield": yield_data}

@app.get("/notifications/")
def get_notifications():
    alerts = notification_service.get_alerts()
    return {"status": "success", "alerts": alerts}
