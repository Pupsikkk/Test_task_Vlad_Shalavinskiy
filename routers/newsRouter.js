const { Router } = require('express');
const { check, body } = require('express-validator');
const path = require('path');
const newsController = require(path.resolve('controllers', 'newsController'));
const {
  idValidator,
  paginationValidator,
  newsValidator,
} = require(path.resolve('validators', 'index'));

const newsRouter = new Router();

newsRouter
  .get('/', paginationValidator('checkLimitAndPage'), newsController.getAllNews)
  .post('/', newsValidator('createNews'), newsController.createNews)
  .delete('/', idValidator, newsController.deleteNews)
  .put('/', newsValidator('updateNews'), newsController.updateNews)
  .get('/getOne', idValidator, newsController.getOne);

module.exports = newsRouter;
