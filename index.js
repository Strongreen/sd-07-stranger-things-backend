const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
const { PORT, UPSIDEDOWN_MODE } = process.env;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = (boolInString) => {
  if (boolInString === 'true') return true;
  return false;
};

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown(UPSIDEDOWN_MODE),
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});
