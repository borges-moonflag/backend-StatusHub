const cron = require('node-cron');
const siteService = require('../services/siteService');

const INTERVAL = process.env.CHECK_INTERVAL || 5;

async function runChecks() {
  console.log(`[${new Date().toISOString()}] Rodando o verificador de sites...`);
  const results = await siteService.runChecks();

  // Loga o status de cada site no console
  results.forEach(site => {
    console.log(`${site.name} [${site.url}] → ${site.status} (${site.responseTime}ms)`);
  });
}

exports.start = () => {
  // 🔹 roda imediatamente ao iniciar
  runChecks();

  // 🔹 roda de acordo com o intervalo definido
  cron.schedule(`*/${INTERVAL} * * * *`, runChecks);

  console.log(`Scheduler iniciado: checando a cada ${INTERVAL} minuto(s)`);
};
