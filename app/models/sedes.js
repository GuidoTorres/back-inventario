module.exports = (sequelize, DataTypes) => {
    const sedes = sequelize.define(
      "sedes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
  
      },
      { timestamps: true, tableName: "sedes", freezeTableName: true }
    );
  
    sedes.associate = function (models) {
      sedes.hasMany(models.dependencias, { foreignKey: "sede_id" });
      sedes.hasMany(models.sub_dependencias, { foreignKey: "sede_id" });
      sedes.hasMany(models.equipo, { foreignKey: "sede_id" });

    };
  
    return sedes;
  };
  