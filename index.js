const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
const PORT = process.env.PORT || 3000;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

let hereIsTheUpsideDown;

switch (process.env.UPSIDEDOWN_MODE) {
  case (true): 
    hereIsTheUpsideDown = true;
    break;
  default:
    hereIsTheUpsideDown = false;
    break;
}

// const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE === 'true' ? true : false;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
