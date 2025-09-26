const express = require("express");
const cors = require("cors");
const scheduler = require("./jobs/scheduler.js");
const siteRoutes = require("./routes/siteRoutes.js")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/", siteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  scheduler.start();
});