const userService = require("../services/userService.js")

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

exports.getAllUsers = async (req, res) => {
    const users = await userService.findAllUsers();
    res.json(users);
};

exports.getUserByMail = async (req, res) => {
  const site = await userService.findByEmail(req.params.email);
  if (!site) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(site);
};