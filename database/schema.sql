CREATE DATABASE IF NOT EXISTS ai_surveillance_system;
USE ai_surveillance_system;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE locations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(150) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7) NULL,
  longitude DECIMAL(10, 7) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  location_id INT NULL,
  citizen_name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NULL,
  status ENUM('Pending', 'In Progress', 'Resolved', 'Rejected') NOT NULL DEFAULT 'Pending',
  priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_complaints_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_complaints_location FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  complaint_id INT NULL,
  location_id INT NULL,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  severity ENUM('Low', 'High') NOT NULL DEFAULT 'High',
  source VARCHAR(80) NOT NULL DEFAULT 'AI Module',
  camera_id VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_alerts_complaint FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  CONSTRAINT fk_alerts_location FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE detection_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  alert_id INT NULL,
  event_type VARCHAR(100) NOT NULL,
  person_count INT NOT NULL DEFAULT 0,
  threshold_value INT NOT NULL DEFAULT 0,
  confidence DECIMAL(5, 4) NULL,
  frame_reference VARCHAR(255) NULL,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_detection_events_alert FOREIGN KEY (alert_id) REFERENCES alerts(id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_complaints_status_created_at ON complaints(status, created_at);
CREATE INDEX idx_complaints_location_id ON complaints(location_id);
CREATE INDEX idx_alerts_severity_created_at ON alerts(severity, created_at);
CREATE INDEX idx_detection_events_detected_at ON detection_events(detected_at);
