"use strict";
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("equipos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      marca: DataTypes.STRING,
      tipo: DataTypes.STRING,
      proveedor: DataTypes.STRING,
      procesador: DataTypes.INTEGER,
      disco_duro: DataTypes.STRING,
      marca: DataTypes.STRING,
      capacidad: DataTypes.STRING,
      memoria: DataTypes.STRING,
      tarjeta_video: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
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
