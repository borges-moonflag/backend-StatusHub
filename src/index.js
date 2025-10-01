const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const scheduler = require("./jobs/scheduler.js");
const siteRoutes = require("./routes/siteRoutes.js")


const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://devtools.desenvolvimentomoonflag.com.br" 
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // permite Postman / curl
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS não permitido'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rotas
app.use("/api", siteRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  scheduler.start();
});