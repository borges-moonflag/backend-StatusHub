const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return { id: result.insertId, name, email };
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};
