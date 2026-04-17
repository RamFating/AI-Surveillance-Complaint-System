import bcrypt from "bcryptjs";

const now = Date.now();

export const users = [
  {
    id: 1,
    name: "System Admin",
    email: "admin@example.com",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin"
  }
];

export const complaints = [
  {
    id: 1,
    name: "Asha Sharma",
    description: "Streetlight camera is obstructed near market road.",
    location: "Central Market",
    status: "Pending",
    imageUrl: "",
    createdAt: new Date(now - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 2,
    name: "Rahul Mehta",
    description: "Crowd buildup detected around bus stand after 8 PM.",
    location: "City Bus Stand",
    status: "In Progress",
    imageUrl: "",
    createdAt: new Date(now - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 3,
    name: "Neha Gupta",
    description: "Illegal dumping reported next to surveillance pole 14.",
    location: "Ward 6",
    status: "Resolved",
    imageUrl: "",
    createdAt: new Date(now - 1000 * 60 * 30).toISOString()
  }
];

export const alerts = [
  {
    id: 1,
    title: "Crowd Threshold Exceeded",
    message: "Detected crowd density beyond configured threshold at Bus Stand camera 2.",
    severity: "High",
    source: "YOLOv8",
    createdAt: new Date(now - 1000 * 60 * 15).toISOString()
  },
  {
    id: 2,
    title: "Suspicious Gathering",
    message: "Repeated person-count spikes recorded near Market Road between 20:00 and 20:10.",
    severity: "Low",
    source: "YOLOv8",
    createdAt: new Date(now - 1000 * 60 * 8).toISOString()
  }
];

export const getNextId = (collection) =>
  collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
