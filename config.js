const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  UPSIDEDOWN_MODE: process.env.UPSIDEDOWN_MODE || 'true',
};