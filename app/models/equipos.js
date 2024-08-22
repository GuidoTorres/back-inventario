
module.exports = (sequelize, DataTypes) =>{

    const equipos = sequelize.define("equipo", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        tipo: DataTypes.STRING,
        marca: DataTypes.STRING,
        sbn: DataTypes.STRING,
        sbn_cpu: DataTypes.STRING,
        fecha_ingreso: DataTypes.STRING,
        proveedor: DataTypes.STRING,
        procesador: DataTypes.STRING,
        capacidad_disco_duro: DataTypes.STRING,
        memoria_ram: DataTypes.STRING,
        tarjeta_video: DataTypes.STRING,
        estado: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        trabajador_id: DataTypes.INTEGER,
        secuencia: DataTypes.INTEGER,
        modelo: DataTypes.STRING,
        caracteristicas: DataTypes.STRING,
        estado_conserv: DataTypes.STRING,
        nro_orden: DataTypes.STRING,
        fecha_compra: DataTypes.DATE,
        valor_compra: DataTypes.FLOAT,
        nro_serie: DataTypes.STRING,
        codigo_barra: DataTypes.STRING,
        empleado_final: DataTypes.STRING,
        // Campos que faltan cpu

        usuario_actual: DataTypes.STRING,
        nombre_pc: DataTypes.STRING,
        tipo_disco_duro: DataTypes.STRING,
        almacenamiento: DataTypes.STRING,
        unidad_optica: DataTypes.BOOLEAN,
        antivirus: DataTypes.BOOLEAN,
        windows: DataTypes.BOOLEAN,

        version_windows: DataTypes.STRING, // licenciado o crackeado
        sistema_operativo: DataTypes.STRING,
        ofimatica: DataTypes.STRING, // licenciado o crackeado
        office: DataTypes.STRING, //version 
        mac: DataTypes.STRING, 

        // campos que faltan impresoras

        suministro: DataTypes.STRING,
        imagen: DataTypes.STRING,
        tamaño: DataTypes.STRING,
        ip: DataTypes.STRING,

        // Monitores

        tecnologia_monitor: DataTypes.STRING, // lcd, led
        
        //telefonos
        anexo: DataTypes.STRING,
        sede_id: DataTypes.INTEGER,
        modulo_id: DataTypes.INTEGER,
        dependencia_id: DataTypes.INTEGER,
        sub_dependencia_id: DataTypes.INTEGER,
        dependencia_id: DataTypes.INTEGER,
        sub_dependencia_id: DataTypes.INTEGER, 
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {timestamps: true, tableName: "equipo", freezeTableName: true})
    equipos.associate = function(models) {
        equipos.belongsTo(models.trabajador, { foreignKey: "trabajador_id" });
        equipos.belongsTo(models.dependencias, {foreignKey: "dependencia_id"})
        equipos.belongsTo(models.sedes, {foreignKey: "sede_id"})
        equipos.belongsTo(models.modulos, {foreignKey:"modulo_id"})
        equipos.belongsTo(models.sub_dependencias, {foreignKey: "sub_dependencia_id"})
      };

    return equipos;

} 