const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { tacticalForceRouter } = require('./routes/tacticalForce.routes');

env.config();

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/tacticalForce', tacticalForceRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
