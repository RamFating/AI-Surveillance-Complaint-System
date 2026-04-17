# Architecture Overview

The system is organized as a modular monorepo:

1. React frontend for public and admin interfaces.
2. Express backend for authentication, complaints, alerts, analytics, and file uploads.
3. Python AI module for detection and alert generation.
4. MySQL for transactional and reporting data.

This structure mirrors real-world layered systems and keeps components independently deployable.
