const { check } = require('express-validator');

module.exports = check('id', 'Некорректный id: id должен быть числом!')
  .notEmpty()
  .isNumeric();
