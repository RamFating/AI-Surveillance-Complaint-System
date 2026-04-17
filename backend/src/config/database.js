import mysql from "mysql2/promise";

let pool;

export const shouldUseMockData = () => process.env.USE_MOCK_DATA === "true";

export const getPool = () => {
  if (shouldUseMockData()) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionLimit: 10
    });
  }

  return pool;
};
