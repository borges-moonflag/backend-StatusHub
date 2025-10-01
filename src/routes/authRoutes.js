const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/login", authController.login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;