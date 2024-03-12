const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  const unidad = sequelize.define(
    "unidad",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombres: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      modulo: DataTypes.STRING,
      base_id: DataTypes.INTEGER
    },
    { timestamps: true, tableName: "unidad", freezeTableName: true }
  );

  unidad.associate = function (models) {
    unidad.hasMany(models.cargo, { foreignKey: "unidad_id" });
    unidad.belongsTo(models.base, {foreignKey: "base_id"})
  };

  return unidad;
};
