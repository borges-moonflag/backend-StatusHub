const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

// Retorna lista de sites
router.get('/sites', siteController.getSites);

// Retorna status atualizado
router.get('/status', siteController.getStatus);

module.exports = router;