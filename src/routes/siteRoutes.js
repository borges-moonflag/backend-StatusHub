const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController.js');

// Rota inicial
router.get("/", (req, res) => res.send("✅ Uptime Monitor rodando com cron no Render!"));

// Rota para listar sites
router.get("/sites", siteController.getAllSites);

// Rota para retornar status
router.get("/status", siteController.getStatus);

module.exports = router;