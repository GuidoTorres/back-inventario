"use strict";
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("perifericos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sbn_monitor: DataTypes.STRING,
      sbn_teclado: DataTypes.STRING,
      marca_monitor: DataTypes.STRING,
      marca_teclado: DataTypes.INTEGER,
      sbn_mouse: DataTypes.STRING,
      sbn_estabilizador: DataTypes.STRING,
      sbn_lectora: DataTypes.STRING,
      sbn_ups: DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
