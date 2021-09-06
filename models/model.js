const path = require('path');
const sequelize = require(path.resolve('db'));
const { DataTypes } = require('sequelize');

const News = sequelize.define(
  'News',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  {
    timestamps: false,
  }
);

module.exports = News;
