import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, getNextId } from "../data/mockStore.js";

const signToken = (user) =>
  jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "change-this-secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

export const register = async (request, response) => {
  const { name, email, password, role = "user" } = request.body;

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ success: false, message: "Name, email, and password are required." });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return response.status(409).json({ success: false, message: "Email already registered." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: getNextId(users),
    name,
    email,
    passwordHash,
    role
  };

  users.push(user);

  return response.status(201).json({
    success: true,
    message: "Registration successful.",
    data: {
      token: signToken(user),
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }
  });
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  const user = users.find((record) => record.email === email);

  if (!user) {
    return response.status(401).json({ success: false, message: "Invalid credentials." });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return response.status(401).json({ success: false, message: "Invalid credentials." });
  }

  return response.json({
    success: true,
    message: "Login successful.",
    data: {
      token: signToken(user),
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }
  });
};
