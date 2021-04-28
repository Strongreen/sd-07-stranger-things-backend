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

let result = process.env.UPSIDEDOWN_MODE;
if (result === 'true') {
  result = true;
} else {
  result = false;
}

const hereIsTheUpsideDown = result;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Escutando na porta 3000');
});
