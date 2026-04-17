import os

from dotenv import load_dotenv

load_dotenv()

settings = {
    "AI_PORT": int(os.getenv("AI_PORT", "8000")),
    "NODE_API_URL": os.getenv("NODE_API_URL", "http://localhost:3000/api"),
    "AI_SHARED_SECRET": os.getenv("AI_SHARED_SECRET", "change-this-ai-secret"),
    "DEFAULT_THRESHOLD": int(os.getenv("DEFAULT_THRESHOLD", "5")),
    "MODEL_VARIANT": os.getenv("MODEL_VARIANT", "yolov8n.pt"),
}
