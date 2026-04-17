# AI Surveillance Complaint System

An AI-powered full stack application for complaint management, real-time surveillance alerts, and admin analytics, designed with an industry-style modular architecture.

## Structure

- `frontend/` React + Vite user interface
- `backend/` Node.js + Express REST API
- `ai-module/` Python service for AI detections and alerts
- `database/` MySQL schema and seed data
- `docs/` architecture and testing documents

## Planned capabilities

- JWT authentication with role-based access
- Complaint creation, search, filters, pagination, and status tracking
- Alert ingestion and monitoring dashboard
- Analytics for complaints and alerts
- AI integration over HTTP between Python and Node.js

## Local setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Default mock admin login:

- Email: `admin@example.com`
- Password: `admin123`

### AI module

```bash
cd ai-module
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Database

Import [database/schema.sql](/D:/FINAL%20%20YEAR%20PROJECT/database/schema.sql) and then [database/seed.sql](/D:/FINAL%20%20YEAR%20PROJECT/database/seed.sql) into MySQL when you are ready to move beyond mock mode.
