const sites = require('../data/sites.json');
const checker = require('../checks/checker');

let lastResults = [];

// Retorna lista de sites
exports.getAllSites = () => sites;

// Retorna últimos resultados
exports.getLastResults = () => lastResults;

// Função para atualizar status dos sites
exports.runChecks = async () => {
  try {
    const results = await checker.checkSites(sites);
    lastResults = results;
    return results;
  } catch (error) {
    console.error('Error running checks:', error);
  }
};
