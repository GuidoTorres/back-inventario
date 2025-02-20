// models/index.js

const Sequelize = require("sequelize");
const config = require("../../config/database.js");
const sequelize = new Sequelize(config);
const db = {};

// Usamos require.context para que Webpack conozca todos los archivos .js en este directorio
const context = require.context(__dirname, false, /\.js$/);

context.keys().forEach((file) => {
  // Excluir este archivo actual (index.js)
  if (file === "./index.js") return;
  
  // Cargamos el modelo pasándole la instancia de Sequelize y los DataTypes
  const model = context(file)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

// Configuramos las asociaciones (si las hay)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exportamos la conexión y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
