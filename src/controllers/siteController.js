const siteService = require('../services/siteService');

// Retorna status dos sites
exports.getStatus = (req, res) => {
  const results = siteService.getLastResults();
  res.json(results);
};

// Opcional: rota para listar todos os sites
exports.getAllSites = (req, res) => {
  const sites = siteService.getAllSites();
  res.json(sites);
};