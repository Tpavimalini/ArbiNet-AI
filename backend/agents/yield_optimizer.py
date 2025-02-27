import numpy as np
from backend.utils.logger import logger

class YieldOptimizer:
    def __init__(self, model_path="backend/models/yield_prediction.pkl"):
        self.model = self.load_model(model_path)

    def load_model(self, path):
        import pickle
        try:
            with open(path, "rb") as file:
                return pickle.load(file)
        except Exception as e:
            logger.error(f"Error loading yield model: {e}")
            return None

    def optimize_yield(self, staking_options):
        """ AI-powered yield farming optimizer. """
        if not self.model:
            logger.error("Yield model not loaded.")
            return {}

        try:
            predictions = self.model.predict(np.array([list(staking_options.values())]))
            return {option: yield_rate for option, yield_rate in zip(staking_options.keys(), predictions)}
        except Exception as e:
            logger.error(f"Error optimizing yield: {e}")
            return {}

if __name__ == "__main__":
    yo = YieldOptimizer()
    print(yo.optimize_yield({"Aave": 3.2, "Compound": 2.8}))

