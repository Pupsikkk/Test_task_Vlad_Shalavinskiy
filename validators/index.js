const path = require('path');
const idValidator = require(path.join(__dirname, 'idValidator'));
const newsValidator = require(path.join(__dirname, 'newsValidator'));
const paginationValidator = require(path.join(
  __dirname,
  'paginationValidator'
));

module.exports = {
  idValidator,
  newsValidator,
  paginationValidator,
};
