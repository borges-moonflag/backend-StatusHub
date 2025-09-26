const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userService.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email já registrado" });

    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};
