const cron = require('node-cron');
const siteService = require('../services/siteService');

const INTERVAL = process.env.CHECK_INTERVAL || 5;

exports.start = () => {
  cron.schedule(`*/${INTERVAL} * * * *`, async () => {
    console.log(`[${new Date().toISOString()}] Rodando o verificador de sites scheduled...`);
    const results = await siteService.runChecks();
    
    // Loga o status de cada site no console
    results.forEach(site => {
      console.log(`${site.name} [${site.url}] → ${site.status} (${site.responseTime}ms)`);
    });
  });

  console.log(`Scheduler iniciado: checando a cada ${INTERVAL} minuto(s)`);
};