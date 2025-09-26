const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController.js');

// Rota inicial
router.get("/", (req, res) => res.send("✅ Uptime Monitor rodando com cron no Render!"));

// Rota para listar sites
router.get("/api/sites", siteController.getAllSites);

// Rota para retornar status
router.get("/api/status", siteController.getStatus);

// 🔹 Rota de metrics
router.get("/api/metrics", siteController.getMetrics);

// 🔹 Rota de health
router.get("/api/health", siteController.getHealth);

module.exports = router;