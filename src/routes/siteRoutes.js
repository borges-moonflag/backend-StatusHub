const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

// CRUD Sites
router.get("/api/", (req, res) => res.send("✅ Uptime Monitor rodando com cron no Render!"));
router.get("/api/sites", siteController.getAllSites);
router.get("/api/sites/:id", siteController.getSiteById);
router.post("/api/sites", siteController.addSite);
router.put("/api/sites/:id", siteController.updateSite);
router.delete("/api/sites/:id", siteController.deleteSite);


router.get("/api/status", siteController.getStatus);
router.get("/api/metrics", siteController.getMetrics);
router.get("/api/health", siteController.getHealth);

module.exports = router;
