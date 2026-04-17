import requests

from config import settings


def send_alert_to_backend(analysis):
    requests.post(
        f"{settings['NODE_API_URL']}/alerts",
        headers={
            "x-service-token": settings["AI_SHARED_SECRET"],
            "Content-Type": "application/json",
        },
        json={
            "title": analysis["title"],
            "message": analysis["message"],
            "severity": analysis["severity"],
            "source": analysis["source"],
            "camera_id": analysis["camera_id"],
        },
        timeout=10,
    )
