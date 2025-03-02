import pickle

def load_model(model_path):
    with open(model_path, "rb") as f:
        return pickle.load(f)

# Load models
portfolio_model = load_model("../models/portfolio_allocation.pkl")
risk_model = load_model("../models/risk_model.pkl")
yield_model = load_model("../models/yield_prediction.pkl")
