const express = require('express');
const cors = require('cors');
require('dotenv/config');

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

/*
Backend
1 - Verifica as variáveis de ambiente
Altere o backend para utilizar variáveis de ambiente para contrololar os seguintes comportamentos:

A porta que a API escutará, essa variável deve ter, nescessáriamente, o nome PORT.

O modo "upsideDown". Essa variável espera um valor boleano e deverá se chamar UPSIDEDOWN_MODE. Lembre-se que as variáveis de ambinte são strings.

O que será testado:

Se existe a variável de ambiente PORT.
Se a variável de ambiente UPSIDEDOWN_MODE existe e se ela é um boleano.
Importante: Para esse projeto, as variáveis de ambiente devem ser definidas em um arquivo .env e o arquivo deve ser enviando no seu PR(Pull Request). ISSO NÃO É UMA PRÁTICA DE MERCADO, o arquivo .env deve ser sempre incluido do .gitignore pois contém informações sensíveis, aqui será enviado apenas por motivo de avaliação.
*/

app.use(cors());

const hereIsTheUpsideDown = true;

const PORT = process.env.PORT;
const UPSIDEDOWN_MODE =  process.env.UPSIDEDOWN_MODE;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT} - ${Date()} - ${UPSIDEDOWN_MODE}`);
});
