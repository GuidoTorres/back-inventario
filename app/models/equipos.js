
module.exports = (sequelize, DataTypes) =>{

    const equipos = sequelize.define("equipo", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        marca: DataTypes.STRING,
        sector: DataTypes.STRING,
        ingreso: DataTypes.STRING,
        modulo: DataTypes.STRING,
        area: DataTypes.STRING,
        tipo: DataTypes.STRING,
        proveedor: DataTypes.STRING,
        procesador: DataTypes.STRING,
        disco_duro: DataTypes.STRING,
        capacidad: DataTypes.STRING,
        memoria: DataTypes.STRING,
        tarjeta_video: DataTypes.STRING,
        sbn: DataTypes.STRING,
        estado: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        trabajador_id: DataTypes.INTEGER,
        secuencia: DataTypes.INTEGER,
        nomb_depend: DataTypes.STRING,
        nomb_sede: DataTypes.STRING,
        modelo: DataTypes.STRING,
        caracteristicas: DataTypes.STRING,
        estado_conserv: DataTypes.STRING,
        estado_actual: DataTypes.STRING,
        nro_orden: DataTypes.STRING,
        fecha_compra: DataTypes.DATE,
        valor_compra: DataTypes.FLOAT,
        nro_serie: DataTypes.STRING,
        codigo_barra: DataTypes.STRING,
        empleado_final: DataTypes.STRING
    
    }, {timestamps: true, tableName: "equipo", freezeTableName: true})
    equipos.associate = function(models) {
        equipos.belongsTo(models.trabajador, { foreignKey: "trabajador_id" });
        equipos.hasMany(models.periferico, { foreignKey: "equipo_id" });
        equipos.hasMany(models.red, { foreignKey: "equipo_id" });
        equipos.hasMany(models.mantenimiento, { foreignKey: "mantenimiento_id" });

      };

    return equipos;

} 