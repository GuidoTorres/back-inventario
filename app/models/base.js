const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  const base = sequelize.define(
    "base",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombres: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      dependencia_id: DataTypes.INTEGER
    },
    { timestamps: true, tableName: "base", freezeTableName: true }
  );

  base.associate = function (models) {
    base.belongsTo(models.dependencia, { foreignKey: "dependencia_id" });
    base.hasMany(models.unidad, {foreignKey: "base_id"})
  };

  return base;
};
