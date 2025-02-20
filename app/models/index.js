// app/models/index.js
const Sequelize = require("sequelize");
const config = require("../../config/database.js");
const sequelize = new Sequelize(config);

const db = {};

// Importa los modelos de forma estática y usa nombres consistentes
db.trabajador = require("./trabajador")(sequelize, Sequelize.DataTypes);
db.dependencias = require("./dependencias")(sequelize, Sequelize.DataTypes);
db.sedes      = require("./sedes")(sequelize, Sequelize.DataTypes);
db.modulos    = require("./modulos")(sequelize, Sequelize.DataTypes);
db.sub_dependencias = require("./sub_dependencias")(sequelize, Sequelize.DataTypes);
db.equipo     = require("./equipos")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
