const equipos = require("./equipos");

module.exports = (sequelize, DataTypes) =>{

    const red = sequelize.define("red", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        equipo_id: DataTypes.INTEGER,
        enRed: DataTypes.BOOLEAN,
        direccion_ip: DataTypes.STRING,
        direccion_mac: DataTypes.STRING,
    
        
    }, {timestamps: true, tableName: "red", freezeTableName: true})
    red.associate = function (models) {
        red.belongsTo(models.equipo, { foreignKey: "equipo_id" });
      };


    return red;

} 