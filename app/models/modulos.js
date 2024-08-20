module.exports = (sequelize, DataTypes) => {
    const modulos = sequelize.define(
      "modulos",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        nombre: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
  
      },
      { timestamps: true, tableName: "modulos", freezeTableName: true }
    );
  
    modulos.associate = function (models) {
      modulos.hasMany(models.dependencias, { foreignKey: "modulo_id" });
      modulos.hasMany(models.sub_dependencias, { foreignKey: "modulo_id" });
      modulos.hasMany(models.equipo, { foreignKey: "modulo_id" });

    };
  
    return modulos;
  };
  