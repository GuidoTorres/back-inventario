module.exports = (sequelize, DataTypes) => {
  const Trabajadores = sequelize.define(
    "trabajador",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombres: DataTypes.STRING,
      apellido_paterno: DataTypes.STRING,
      apellido_materno: DataTypes.STRING,
      dni: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
      de_func: DataTypes.STRING,
      codigo: DataTypes.STRING,
    },
    { timestamps: true, tableName: "trabajador", freezeTableName: true }
  );

  Trabajadores.associate = function (models) {
    Trabajadores.hasMany(models.equipo, { foreignKey: "trabajador_id" });
  };

  return Trabajadores;
};
