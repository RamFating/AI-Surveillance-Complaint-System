from flask import Flask, jsonify, request

from services.alert_client import send_alert_to_backend
from services.detector import analyze_frame

app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify(
        {
            "success": True,
            "message": "AI module is healthy",
        }
    )


@app.post("/detect/frame")
def detect_frame():
    payload = request.get_json(silent=True) or {}
    analysis = analyze_frame(payload)

    if analysis["threshold_exceeded"]:
        send_alert_to_backend(analysis)

    return jsonify(
        {
            "success": True,
            "data": analysis,
        }
    )


if __name__ == "__main__":
    from config import settings

    app.run(host="0.0.0.0", port=settings["AI_PORT"], debug=True)
