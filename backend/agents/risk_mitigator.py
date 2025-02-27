import numpy as np
from backend.utils.logger import logger

class RiskMitigator:
    def __init__(self, model_path="backend/models/risk_model.pkl"):
        self.model = self.load_model(model_path)

    def load_model(self, path):
        import pickle
        try:
            with open(path, "rb") as file:
                return pickle.load(file)
        except Exception as e:
            logger.error(f"Error loading risk model: {e}")
            return None

    def assess_risk(self, portfolio):
        """ Predicts liquidation & impermanent loss risks. """
        if not self.model:
            logger.error("Risk model not loaded.")
            return {}

        try:
            risk_scores = self.model.predict(np.array([list(portfolio.values())]))
            return {asset: score for asset, score in zip(portfolio.keys(), risk_scores)}
        except Exception as e:
            logger.error(f"Error assessing risk: {e}")
            return {}

if __name__ == "__main__":
    rm = RiskMitigator()
    print(rm.assess_risk({"ETH": 1.5, "BTC": 0.8}))

