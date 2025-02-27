import numpy as np
from backend.utils.logger import logger

class PortfolioManager:
    def __init__(self, model_path="backend/models/portfolio_allocation.pkl"):
        self.model = self.load_model(model_path)

    def load_model(self, path):
        import pickle
        try:
            with open(path, "rb") as file:
                return pickle.load(file)
        except Exception as e:
            logger.error(f"Error loading portfolio model: {e}")
            return None

    def optimize_allocation(self, assets, risk_tolerance):
        """ Dynamically allocate assets based on AI predictions. """
        if not self.model:
            logger.error("Portfolio model not loaded.")
            return {}

        try:
            allocations = self.model.predict(np.array([assets, risk_tolerance]))
            return {asset: weight for asset, weight in zip(assets.keys(), allocations)}
        except Exception as e:
            logger.error(f"Error optimizing portfolio: {e}")
            return {}

if __name__ == "__main__":
    pm = PortfolioManager()
    print(pm.optimize_allocation({"ETH": 1, "BTC": 1}, 0.5))

