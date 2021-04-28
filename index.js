const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');
require('dotenv').config();

const app = express();
// const port = process.env.PORT || 3000;
const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = JSON.parse(process.env.UPSIDEDOWN_MODE) || false;
let port;
if (hereIsTheUpsideDown) {
  port = process.env.PORT || 3003;
} else {
  port = process.env.PORT || 3002;
}
app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );  

  res.status(200).json(characters);
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
