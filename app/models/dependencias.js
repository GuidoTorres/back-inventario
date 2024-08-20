
module.exports = (sequelize, DataTypes) => {
  const dependencia = sequelize.define(
    "dependencias",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre: DataTypes.STRING,
      sede_id: DataTypes.INTEGER,
      modulo_id: DataTypes.INTEGER,
      dependencia_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    { timestamps: true, tableName: "dependencias", freezeTableName: true }
  );

  dependencia.associate = function (models) {
    // dependencia.hasMany(models.dependencias, { foreignKey: "dependencia_id" })
    // dependencia.belongsTo(models.dependencias, { foreignKey: "dependencia_id" })
    dependencia.hasMany(models.sub_dependencias, { foreignKey: "dependencia_id" });
    dependencia.belongsTo(models.sedes, { foreignKey: "sede_id" } )
    dependencia.belongsTo(models.modulos, { foreignKey: "modulo_id" } )
    dependencia.hasMany(models.equipo, { foreignKey: "dependencia_id" });

  };

  return dependencia;
};
