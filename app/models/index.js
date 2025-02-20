// app/models/index.js

const Sequelize = require("sequelize");
const config = require("../../config/database.js");
const sequelize = new Sequelize(config);

const db = {};

// Importa los modelos de forma estática
// Asegúrate de que el nombre asignado coincida con el que usarás en tus controladores.
db.equipo = require("./equipos")(sequelize, Sequelize.DataTypes);
db.dependencias = require("./dependencias")(sequelize, Sequelize.DataTypes);
db.modulos = require("./modulos")(sequelize, Sequelize.DataTypes);
db.sedes = require("./sedes")(sequelize, Sequelize.DataTypes);
db.sub_dependencias = require("./sub_dependencias")(sequelize, Sequelize.DataTypes);
db.trabajadores = require("./trabajadores")(sequelize, Sequelize.DataTypes);
db.usuario = require("./usuario")(sequelize, Sequelize.DataTypes);

// Si tienes más modelos, agrégalos aquí, por ejemplo:
// db.Usuario = require("./usuario")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
