const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const userController = require("../controllers/userController")
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// CRUD Sites
router.get("/api/test", (req, res) => {
  res.json({ message: "Rewrite funcionando!" });
});


router.get("/", (req, res) => res.send("✅ Uptime Monitor rodando com cron no Render!"));
router.get("/sites", siteController.getAllSites);
router.get("/sites/:id", siteController.getSiteById);
router.post("/sites", siteController.addSite);
router.put("/sites/:id", siteController.updateSite);
router.delete("/sites/:id", siteController.deleteSite);

router.get("/users", userController.getAllUsers)
router.get("/users/:email", userController.getUserByMail);
router.post("/users/register", userController.register);

router.get("/auth/me", authMiddleware, (req, res) => {res.json({ user: req.user });});
router.post("/auth/login", authController.login);
router.post("/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.json({
    message: "Logout realizado com sucesso",
    token: null,
  });
});

router.get("/status", siteController.getStatus);
router.get("/metrics", siteController.getMetrics);
router.get("/health", siteController.getHealth);

module.exports = router;
