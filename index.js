const express = require('express');
const path = require('path');
const sequelize = require(path.resolve('db'));
const newsRouter = require(path.resolve('routers', 'newsRouter.js'));
const errorsHandler = require(path.resolve('middleware', 'errorsHandler'));

const PORT = 8000;

const app = express();
app.use(express.json());
app.use('/news', newsRouter);
app.use(errorsHandler);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
