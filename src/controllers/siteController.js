const siteService = require("../services/siteService");

exports.getAllSites = async (req, res) => {
  const sites = await siteService.getAllSites();
  res.json(sites);
};

exports.getSiteById = async (req, res) => {
  const site = await siteService.getSiteById(req.params.id);
  if (!site) return res.status(404).json({ message: "Site não encontrado" });
  res.json(site);
};

exports.addSite = async (req, res) => {
  const site = await siteService.addSite(req.body);
  res.status(201).json(site);
};

exports.updateSite = async (req, res) => {
  const site = await siteService.updateSite(req.params.id, req.body);
  res.json(site);
};

exports.deleteSite = async (req, res) => {
  const site = await siteService.deleteSite(req.params.id);
  res.json({ message: "Site removido", site });
};

// Status / Metrics / Health
exports.getStatus = async (req, res) => {
  const sites = await siteService.getAllSites();
  res.json(sites);
};

exports.getMetrics = async (req, res) => {
  const results = await siteService.getAllSites();
  if (!results.length) return res.json({ message: "Nenhum dado ainda" });

  const totalSites = results.length;
  const upSites = results.filter(s => s.status === "UP").length;
  const downSites = results.filter(s => s.status === "DOWN").length;
  const avgResponseTime =
    results.reduce((acc, s) => acc + (s.response_time || 0), 0) / totalSites;

  res.json({
    totalSites,
    upSites,
    downSites,
    upPercentage: ((upSites / totalSites) * 100).toFixed(2) + "%",
    downPercentage: ((downSites / totalSites) * 100).toFixed(2) + "%",
    avgResponseTime: Math.round(avgResponseTime) + "ms"
  });
};

exports.getHealth = (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};
