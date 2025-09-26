require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const siteRoutes = require('../routes/siteRoutes');
const scheduler = require('../jobs/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Rotas
app.use('/api', siteRoutes);

// Inicia cron job
scheduler.start();

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
