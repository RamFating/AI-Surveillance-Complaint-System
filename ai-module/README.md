# AI Module

Python service for AI-based surveillance detections and backend alert generation.

## Responsibilities

- Receive frame or event metadata from a camera pipeline
- Run person-count analysis logic
- Compare counts with a configurable crowd threshold
- Push alerts into the Node.js backend over HTTP

## Suggested runtime flow

1. Camera or video feed sends metadata to `/detect/frame`.
2. The detector checks the crowd threshold.
3. When the threshold is exceeded, the module sends an alert to the backend.
4. The backend stores the alert and exposes it to the admin dashboard.

## Next upgrade

Replace the placeholder `analyze_frame` logic with direct OpenCV frame parsing and YOLOv8 inference.
