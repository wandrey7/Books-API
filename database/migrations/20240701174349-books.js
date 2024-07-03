"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      published_date: {
        type: Sequelize.DATE,
      },
      summary: {
        type: Sequelize.STRING(1000),
      },
      isbn: {
        type: Sequelize.STRING(13),
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {},
};
