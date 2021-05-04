const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
const PORT = JSON.parse(process.env.PORT);
const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const UPSIDEDOWN_MODE = JSON.parse(process.env.UPSIDEDOWN_MODE);
// const hereIsTheUpsideDown = true;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    // hereIsTheUpsideDown,
    UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
