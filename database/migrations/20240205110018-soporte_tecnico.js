"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("soporte_tecnico", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      trabajador_id: DataTypes.INTEGER,
      descripcion: DataTypes.STRING,
      material_utilizado: DataTypes.STRING,
      observacion: DataTypes.INTEGER,
      fecha: DataTypes.STRING,
      hora: DataTypes.STRING,
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
