const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

module.exports = (req, res, next) => {
  // Pega o token do cookie
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // adiciona info do usuário à requisição
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
