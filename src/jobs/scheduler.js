const cron = require("node-cron");
const siteService = require("../services/siteService");
const axios = require("axios");

const INTERVAL = process.env.CHECK_INTERVAL || 5;

// Função que checa todos os sites
async function runChecks() {
  const sites = await siteService.getAllSites();
  const now = new Date().toISOString();
  console.log(`\n[${now}] 🔄 Rodando verificador de sites...`);

  for (const site of sites) {
    try {
      const start = Date.now();
      await axios.get(site.url, { timeout: 10000 });
      const responseTime = Date.now() - start;
      await siteService.updateSiteStatus({
        id: site.id,
        status: "UP",
        response_time: responseTime,
        last_checked: now
      });
      console.log(`${site.name} [${site.url}] → UP (${responseTime}ms)`);
    } catch (error) {
      await siteService.updateSiteStatus({
        id: site.id,
        status: "DOWN",
        response_time: null,
        last_checked: now
      });
      console.log(`${site.name} [${site.url}] → DOWN`);
    }
  }

  console.log("✔ Checagem finalizada\n");
}

exports.start = () => {
  // Roda imediatamente ao iniciar
  runChecks();

  // Roda de acordo com o intervalo
  cron.schedule(`*/${INTERVAL} * * * *`, runChecks);

  console.log(`Scheduler iniciado: checando a cada ${INTERVAL} minuto(s)`);
};
