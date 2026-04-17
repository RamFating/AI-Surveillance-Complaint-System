USE ai_surveillance_system;

INSERT INTO roles (name)
VALUES ('admin'), ('user');

INSERT INTO users (role_id, name, email, password_hash)
VALUES
  (1, 'System Admin', 'admin@example.com', '$2a$10$abcdefghijklmnopqrstuv'),
  (2, 'Demo Citizen', 'citizen@example.com', '$2a$10$abcdefghijklmnopqrstuv');

INSERT INTO locations (label, address, latitude, longitude)
VALUES
  ('Central Market', 'Central Market Road', 23.0225050, 72.5713621),
  ('City Bus Stand', 'Bus Stand Main Gate', 23.0240000, 72.5740000),
  ('Ward 6', 'Ward 6 Surveillance Pole 14', 23.0300000, 72.5800000);

INSERT INTO complaints (user_id, location_id, citizen_name, title, description, status, priority)
VALUES
  (2, 1, 'Asha Sharma', 'Camera visibility issue', 'Streetlight camera is obstructed near market road.', 'Pending', 'Medium'),
  (2, 2, 'Rahul Mehta', 'Crowd buildup observed', 'Crowd buildup detected around bus stand after 8 PM.', 'In Progress', 'High'),
  (2, 3, 'Neha Gupta', 'Illegal dumping', 'Illegal dumping reported next to surveillance pole 14.', 'Resolved', 'Low');

INSERT INTO alerts (location_id, title, message, severity, source, camera_id)
VALUES
  (2, 'Crowd Threshold Exceeded', 'Detected crowd density beyond configured threshold at Bus Stand camera 2.', 'High', 'YOLOv8', 'CAM-02'),
  (1, 'Suspicious Gathering', 'Repeated person-count spikes recorded near Market Road.', 'Low', 'YOLOv8', 'CAM-08');
