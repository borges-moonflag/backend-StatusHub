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

// Rota /metrics
exports.getMetrics = (req, res) => {
  const results = siteService.getLastResults();
  if (!results.length) return res.json({ message: "Nenhum dado ainda" });

  const totalSites = results.length;
  const upSites = results.filter(s => s.status === "UP").length;
  const downSites = results.filter(s => s.status === "DOWN").length;
  const avgResponseTime =
    results.reduce((acc, s) => acc + (s.responseTime || 0), 0) / totalSites;

  res.json({
    totalSites,
    upSites,
    downSites,
    upPercentage: ((upSites / totalSites) * 100).toFixed(2) + "%",
    downPercentage: ((downSites / totalSites) * 100).toFixed(2) + "%",
    avgResponseTime: Math.round(avgResponseTime) + "ms"
  });
};

// Rota /health
exports.getHealth = (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};