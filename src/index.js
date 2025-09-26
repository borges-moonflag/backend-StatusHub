const express = require("express");
const scheduler = require("./jobs/scheduler.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Uptime Monitor rodando com cron no Render!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  scheduler.start();
});