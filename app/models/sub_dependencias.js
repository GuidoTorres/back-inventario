const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  const sub_dependencias = sequelize.define(
    "sub_dependencias",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre: DataTypes.STRING,
      dependencia_id: DataTypes.INTEGER,
      sede_id: DataTypes.INTEGER,
      modulo_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    { timestamps: true, tableName: "sub_dependencias", freezeTableName: true }
  );

  sub_dependencias.associate = function (models) {
    sub_dependencias.belongsTo(models.dependencias, {foreignKey: "dependencia_id"})
    sub_dependencias.belongsTo(models.sedes, { foreignKey: "sede_id" } )
    sub_dependencias.belongsTo(models.modulos, { foreignKey: "modulo_id" } )
    sub_dependencias.hasMany(models.equipo, { foreignKey: "sub_dependencia_id" });

  };

  return sub_dependencias;
};
