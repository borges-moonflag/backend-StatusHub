const express = require("express");
const scheduler = require("./jobs/scheduler.js");
const siteService = require("./services/siteService.js")
const siteRoutes = require("./routes/siteRoutes.js")

const app = express();
const PORT = process.env.PORT || 3000;

// Rotas
app.use("/", siteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  scheduler.start();
});