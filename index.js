const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { PORT, UPSIDEDOWN_MODE } = process.env;

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

// const hereIsTheUpsideDown = true;
const hereIsTheUpsideDown = UPSIDEDOWN_MODE;
// const UPSIDEDOWN_MODE = process.env.UPSIDEDOWN_MODE === 'true';
// const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
    // UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

// ajuda de Zega, Thadeu Castelo Branco, Mateus Leite
// git push heroku rodrigoandrademelo-sd-07-stranger-things-frontend:master
// bd=invertido
