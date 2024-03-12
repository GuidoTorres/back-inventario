const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  const dependencia = sequelize.define(
    "dependencia",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombres: DataTypes.STRING,
      descripcion: DataTypes.STRING,
    },
    { timestamps: true, tableName: "dependencia", freezeTableName: true }
  );

  dependencia.associate = function (models) {
    dependencia.hasMany(models.base, { foreignKey: "dependencia_id" });
  };

  return dependencia;
};
