const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const userController = require("../controllers/userController")
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// CRUD Sites
router.get("/", (req, res) => res.send("✅ Uptime Monitor rodando com cron no Render!"));
router.get("/sites", siteController.getAllSites);
router.get("/sites/:id", siteController.getSiteById);
router.post("/sites", siteController.addSite);
router.put("/sites/:id", siteController.updateSite);
router.delete("/sites/:id", siteController.deleteSite);

router.get("/users", userController.getAllUsers)
router.get("/users/:email", userController.getUserByMail);
router.post("/users/register", userController.register);

router.get("/me", authMiddleware, (req, res) => {res.json({ user: req.user });});
router.post("/auth/login", authController.login);

router.get("/status", siteController.getStatus);
router.get("/metrics", siteController.getMetrics);
router.get("/health", siteController.getHealth);

module.exports = router;
