const { body } = require('express-validator');

module.exports = (method) => {
  switch (method) {
    case 'checkLimitAndPage': {
      return [
        body('limit', 'Некорректный лимит')
          .optional()
          .notEmpty()
          .isNumeric()
          .custom((limit) => limit >= 1),
        body('page', 'Неверная страница')
          .optional()
          .notEmpty()
          .isNumeric()
          .custom((page) => page >= 1),
      ];
    }
  }
};
