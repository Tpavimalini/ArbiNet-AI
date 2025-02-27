import openai
from backend.utils.config import OPENAI_API_KEY
from backend.utils.logger import logger

openai.api_key = OPENAI_API_KEY

class ChatbotInterface:
    def __init__(self):
        pass

    def get_response(self, user_query):
        """ Returns AI-generated response to user queries. """
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": user_query}]
            )
            return response["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Chatbot error: {e}")
            return "Error processing request."

if __name__ == "__main__":
    cb = ChatbotInterface()
    print(cb.get_response("How can I optimize my DeFi portfolio?"))

