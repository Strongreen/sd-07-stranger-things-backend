const express = require('express');
const cors = require('cors');
const { PORT, SUCCESS } = require('Codes.js');


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

const hereIsTheUpsideDown = true;

app.get('/', (__req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(SUCCESS).json(characters);
});

app.listen(PORT);
