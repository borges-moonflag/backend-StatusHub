const express = require("express");
const cors = require("cors");
const scheduler = require("./jobs/scheduler.js");
const siteRoutes = require("./routes/siteRoutes.js")


const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://frontend-status-hub.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Rotas
app.use("/api", siteRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  scheduler.start();
});