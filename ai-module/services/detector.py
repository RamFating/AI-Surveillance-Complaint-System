from config import settings


def analyze_frame(payload):
    person_count = int(payload.get("person_count", 0))
    threshold = int(payload.get("threshold", settings["DEFAULT_THRESHOLD"]))
    location = payload.get("location", "Unknown camera location")
    camera_id = payload.get("camera_id", "CAM-UNKNOWN")

    return {
        "title": "Crowd Threshold Exceeded",
        "message": (
            f"Detected {person_count} people at {location} from {camera_id}, "
            f"above threshold {threshold}."
        ),
        "severity": "High" if person_count > threshold + 2 else "Low",
        "source": settings["MODEL_VARIANT"],
        "camera_id": camera_id,
        "person_count": person_count,
        "threshold": threshold,
        "threshold_exceeded": person_count > threshold,
    }
