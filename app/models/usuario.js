
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define(
    "usuario",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      usuario: DataTypes.STRING,
      contrasenia: DataTypes.STRING,
      nombre: DataTypes.STRING,
      tipo: DataTypes.STRING,
      estado: DataTypes.STRING,
    },
    { timestamps: true, tableName: "usuario", freezeTableName: true }
  );



  return usuario;
};
