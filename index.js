const express = require('express');
const cors = require('cors');
require('dotenv').config();
const process = require('process');
const { PORT, UPSIDEDOWN_MODE } = process.env;
const SUCCESS = 200;
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

const hereIsTheUpsideDown = UPSIDEDOWN_MODE === 'true';

app.get('/', (__req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(SUCCESS).json(characters);
});

app.listen(PORT);
