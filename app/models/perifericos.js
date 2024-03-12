const equipos = require("./equipos");

module.exports = (sequelize, DataTypes) =>{

    const perifericos = sequelize.define("periferico", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        sbn_monitor: DataTypes.STRING,
        sbn_teclado: DataTypes.STRING,
        marca_monitor: DataTypes.STRING,
        marca_teclado: DataTypes.INTEGER,
        sbn_mouse: DataTypes.STRING,
        sbn_estabilizador: DataTypes.STRING,
        sbn_lectora: DataTypes.STRING,
        sbn_ups: DataTypes.STRING,
        periferico_id: DataTypes.INTEGER
    
        
    }, {timestamps: true, tableName: "trabajador", freezeTableName: true})
    perifericos.associate = function (models) {
        perifericos.belongsTo(models.equipo,{foreignKey: "periferico_id"})
      };

    return perifericos;

} 