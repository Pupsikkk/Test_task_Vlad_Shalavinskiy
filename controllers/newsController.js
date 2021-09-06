const path = require('path');
const ApiError = require(path.resolve('errors', 'ApiError'));
const News = require(path.resolve('models', 'model'));
const { validationResult } = require('express-validator');

class NewsController {
  async getAllNews(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: 'Ошибка при валидации', errors });
      let { limit, page } = req.query;

      limit = +limit > 0 ? +limit : 9;
      page = +page > 0 ? +page : 1;

      let offset = limit * page - limit;
      const data = (await News.findAndCountAll({ limit, offset })).rows.map(
        (news) => {
          news.dataValues.tags = news.dataValues.tags.split(' ') || [];
          return news;
        }
      );
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return next(ApiError.internalError());
    }
  }

  async getOne(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: 'Ошибка при валидации', errors });

    const { id } = req.query;

    const findedNews = await News.findOne({
      where: { id: id },
    });

    if (!findedNews)
      return next(ApiError.BadRequest('Новости с таким id не существует'));

    findedNews.tags = findedNews.tags.split(' ') || [];
    res.status(200).json(findedNews);
  }

  async createNews(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: 'Ошибка при валидации', errors });

      const { title, description, date, tags } = req.body;
      let newNews = await News.create({
        title: title,
        description: description,
        tags: tags.join(' '),
        date: Date.parse(date),
      });
      res.status(200).json(newNews);
    } catch (err) {
      console.error(err);
      return next(ApiError.internalError());
    }
  }

  async updateNews(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: 'Ошибка при валидации', errors });

      const { id, title, description, date, tags } = req.body;
      const newsForUpdate = await News.findOne({
        where: {
          id: +id,
        },
      });
      if (!newsForUpdate)
        return next(ApiError.BadRequest('Новости с такой id не существует!'));
      await News.update(
        {
          title: title || newsForUpdate.title,
          description: description || newsForUpdate.description,
          tags: tags.join(' ') || newsForUpdate.tags,
          date: date || newsForUpdate.date,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ message: 'Успешно изменено!' });
    } catch (err) {
      console.error(err);
      return next(ApiError.internalError());
    }
  }

  async deleteNews(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: 'Ошибка при валидации', errors });

      const { id } = req.query;
      const candidateForDelete = await News.findOne({
        where: { id: id },
      });
      if (!candidateForDelete)
        return next(ApiError.BadRequest('Новости с такой id не существует!'));
      candidateForDelete.destroy();
      res.status(200).json(candidateForDelete);
    } catch (err) {
      console.error(err);
      return next(ApiError.internalError());
    }
  }
}

module.exports = new NewsController();
