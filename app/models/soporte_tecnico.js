const trabajadores = require("./trabajadores");

module.exports = (sequelize, DataTypes) => {
  const soporte_tecnico = sequelize.define(
    "soporte_tecnico",
    {
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
      estado: DataTypes.STRING
  
    },
    { timestamps: true, tableName: "soporte_tecnico", freezeTableName: true }
  );
  soporte_tecnico.associate = function (models) {
    soporte_tecnico.hasMany(models.trabajador, { foreignKey: "soporte_tecnico_id" });
  };


  return soporte_tecnico;
};
