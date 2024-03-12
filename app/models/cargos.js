module.exports = (sequelize, DataTypes) => {
  const cargos = sequelize.define(
    "cargo",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombres: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      unidad_id: DataTypes.INTEGER,
      encargado_id: { // Campo nuevo para la autoreferencia
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'cargo', // Esto referencia a la misma tabla 'cargo'
          key: 'id',
        }
      },
    },
    { timestamps: true, tableName: "cargo", freezeTableName: true }
  );

  cargos.associate = function (models) {
    cargos.hasMany(models.trabajador, {foreignKey: "cargo_id"})
    cargos.belongsTo(models.unidad, { foreignKey: "unidad_id" });
    cargos.belongsTo(models.cargo, { as: 'CargoSuperior', foreignKey: "encargado_id" }); 
    cargos.hasMany(models.cargo, { as: 'SubCargo', foreignKey: "encargado_id" });
  };

  return cargos;
};

