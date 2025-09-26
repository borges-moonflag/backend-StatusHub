const siteService = require('../services/siteService');

// Retorna lista de sites
exports.getSites = (req, res) => {
  const sites = siteService.getAllSites();
  res.json(sites);
};

// Retorna status atualizado
exports.getStatus = (req, res) => {
  const status = siteService.getLastResults();
  res.json(status);
};
