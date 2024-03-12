const equipos = require("./equipos");

module.exports = (sequelize, DataTypes) => {
  const mantenimientos = sequelize.define(
    "mantenimiento",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tipo: DataTypes.STRING,
      fecha: DataTypes.STRING,
      observaciones: DataTypes.STRING,
      aceptacion_responsable: DataTypes.STRING,
      equipo_id: DataTypes.INTEGER
  
    },
    { timestamps: true, tableName: "trabajador", freezeTableName: true }
  );

  mantenimientos.associate = function (models) {
    mantenimientos.belongsTo(models.equipo, { foreignKey: "equipo_id" });
  };

  return mantenimientos;
};
