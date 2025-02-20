// app/models/index.js

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../../config/database.js");

const db = {};
const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
  .filter(file => {
    // Excluir archivos que no sean .js o el propio index.js
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    // Se requiere el modelo y se le pasa la instancia de sequelize y los DataTypes
    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configurar asociaciones (si existen)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
