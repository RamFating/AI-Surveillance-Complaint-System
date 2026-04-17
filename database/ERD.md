# Entity Relationship Summary

## Core entities

- `roles` defines system roles such as `admin` and `user`.
- `users` stores registered accounts and links each user to a role.
- `locations` stores reusable geographic records for complaints and alerts.
- `complaints` is the main workflow table for citizen-reported incidents.
- `alerts` stores AI-generated or admin-created surveillance alerts.
- `detection_events` stores raw AI inference metadata for analytics and auditability.

## Key relationships

- One role can have many users.
- One location can be linked to many complaints and alerts.
- One complaint can optionally be connected to many follow-up alerts over time.
- One alert can have many detection events.
