const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

const { UPSIDEDOWN_MODE } = process.env;

const hereIsTheUpsideDown = (string) => {
  if (string === 'true') return true;
  return false;
};

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
    hereIsTheUpsideDown(UPSIDEDOWN_MODE),
  );

  res.status(200).json(characters);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Linstening to the port ${PORT}`);
});
