const { body } = require('express-validator');
const path = require('path');
const idValidator = require(path.join(__dirname, 'idValidator'));

module.exports = (method) => {
  switch (method) {
    case 'createNews': {
      return [
        body('title').exists().isString().isLength({ min: 4, max: 100 }),
        body('description', 'Некорректное описание')
          .exists()
          .isString()
          .isLength({ min: 4, max: 10000 }),
        body('tags', 'Некорректный массив тегов').optional().isArray(),
        body('date', 'Некорректная дата. Формат: YYYY-MM-DD').exists().isDate(),
      ];
    }
    case 'updateNews': {
      return [
        idValidator,
        body('title', 'Некорректное оглавление')
          .exists()
          .isString()
          .isLength({ min: 4, max: 100 }),
        body('description', 'Некорректное описание')
          .exists()
          .isString()
          .isLength({ min: 4, max: 10000 }),
        body('tags', 'Некорректный массив тегов').optional().isArray(),
        body('date', 'Некорректная дата. Формат: YYYY-MM-DD').exists().isDate(),
      ];
    }
  }
};
