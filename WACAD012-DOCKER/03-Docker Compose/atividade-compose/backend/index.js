import express from "express";
import mysql from "mysql2/promise";

const app = express();
const port = 4444;

// CORS simples
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "bdcontainer",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "pass2024",
  database: process.env.DB_NAME || "webacademy"
});

app.get("/alunos", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nome FROM webacademy_alunos");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get("/health", (_req, res) => res.send("ok"));

app.listen(port, "0.0.0.0", () => {
  console.log(`API on http://localhost:${port}`);
});
