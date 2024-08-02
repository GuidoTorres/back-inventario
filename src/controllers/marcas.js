const db = require("../../app/models/index");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getMarcas = async (req, res) => {
    try {
      const responseMarcas = await fetch("http://localhost:3001/api/v1/marcas");
  
      const marcasData = await responseMarcas.json();

      return res.json(marcasData);

    } catch (error) {
      // Manejar errores
      console.log(error);
      res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }
  };


  module.exports={
    getMarcas
  }