'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable("trabajadores", {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombres: DataTypes.STRING,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    dni: DataTypes.STRING,
    area_id: DataTypes.INTEGER,
    cargo_id: DataTypes.INTEGER,
    equipo_id: DataTypes.INTEGER,
    solicitud_soporte_id: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
