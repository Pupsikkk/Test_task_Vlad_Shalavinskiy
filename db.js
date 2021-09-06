const { Sequelize } = require('sequelize');

module.exports = new Sequelize('news_db', 'postgres', 'Vlad2you', {
  dialect: 'postgres',
  host: 'localhost',
  port: 6000,
  logging: false,
});
