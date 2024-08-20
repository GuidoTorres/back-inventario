const { Op } = require("sequelize");
const db = require("../../app/models/index");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getTrabajador = async (req, res) => {
  try {
    const trabajador = await db.trabajador.findAll({
      where: { estado: true },
      include: [
        {
          model: db.equipo,
          attributes: [
            "sbn",
            "descripcion",
            "modelo",
            "estado",
            "estado_conserv",
            "trabajador_id",
          ],
        },
      ],
    });
    const trabajadoresConIdEquipos = trabajador.map((trabajador) => {
      const equiposConId = trabajador.equipos.map((equipo, index) => ({
        ...equipo.dataValues, // Asegúrate de usar dataValues para obtener los valores reales del objeto Sequelize
        id: index + 1, // Aquí 'id' puede ser el valor original o el índice como un identificador único temporal
      }));
      return {
        ...trabajador.dataValues,
        equipos: equiposConId,
      };
    });

    return res.json({ data: trabajadoresConIdEquipos });
  } catch (error) {
    console.log(error);
  }
};
const getTrabajadorSelect = async (req, res) => {
  try {
    const trabajador = await db.trabajador.findAll({
      where: { estado: true },
      attributes: ["id", "nombres", "apellido_paterno", "apellido_materno"],
    });

    const format = trabajador.map((item) => {
      return {
        id: item.id,
        nombre:
          item.nombres +
          " " +
          item.apellido_paterno +
          " " +
          item.apellido_materno,
      };
    });
    return res.json({ data: format });
  } catch (error) {
    console.log(error);
  }
};
const postTrabajador = async (req, res) => {
  try {
    const {
      nombres,
      apellido_paterno,
      apellido_materno,
      dni,
      cargo_id,
      equipo_id,
      solicitud_soporte_id,
      estado,
    } = req.body;

    console.log(req.body);

    const trabajador = await db.trabajador.findOne({ where: { dni: dni } });

    if (trabajador) {
      return res
        .status(500)
        .json({ msg: "Ya existe un trabajador registrado con ese dni." });
    }

    await db.trabajador.create(req.body);

    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateTrabajador = async (req, res) => {
  try {
    const id = req.params.id;
    await db.trabajador.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};

const updateTrabajadorEstado = async (req, res) => {
  try {
    const id = req.params.id;
    const trabajador = await db.trabajador.findOne({ where: { id: id } });

    await db.trabajador.update(
      { estado: !trabajador.estado },
      { where: { id: id } }
    );

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteTrabajador = async (req, res) => {
  try {
    const id = req.params.id;
    await db.trabajador.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};
const trabajadoresPlanilla = async (req, res) => {
  try {
    const responsePlanilla = await fetch(
      "http://localhost:3001/api/v1/planilla"
    );
    const responsePersonal = await fetch(
      "http://localhost:3001/api/v1/personal"
    );

    const planillaData = await responsePlanilla.json();
    const personalData = await responsePersonal.json();
    const existingData = await db.trabajador.findAll();

    const personalMap = new Map();
    personalData.data.forEach((item) => {
      personalMap.set(item.docum_ident, item.empleado);
    });

    const formatExternalData = planillaData.data.map((item) => {
      return {
        dni: item.NU_DOCU,
        nombres: item.DE_NOMB,
        apellido_paterno: item.AP_PATE,
        apellido_materno: item.AP_MATE,
        de_func: item.DE_FUNC,
        codigo: personalMap.get(item.NU_DOCU) || null, // Añadir el campo 'codigo' basado en la coincidencia
      };
    });

    const existingDni = existingData.map((item) => item.dni);

    // Filtrar los datos para encontrar los nuevos que no están en la tabla trabajador
    const newData = formatExternalData.filter(
      (item) => !existingDni.includes(item.dni)
    );
    await db.trabajador.bulkCreate(newData);

    // Enviar la respuesta al cliente
    return res.json({
      message: "Sincronización completa",
      newRecords: newData.length,
    });
  } catch (error) {
    // Manejar errores
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  getTrabajador,
  getTrabajadorSelect,
  postTrabajador,
  updateTrabajador,
  deleteTrabajador,
  trabajadoresPlanilla,
  updateTrabajadorEstado,
};
