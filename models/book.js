const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Book extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        genre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        published_date: {
          type: DataTypes.DATE,
        },
        summary: {
          type: DataTypes.STRING(1000),
        },
        isbn: {
          type: DataTypes.STRING(13),
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "Book",
        tableName: "books",
        freezeTableName: true,
      }
    );
  }
}

Book.init(sequelize);

module.exports = Book;
