const { Op } = require("sequelize");
const db = require("../../app/models/index");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getTrabajador = async (req, res) => {
  try {
    const trabajador = await db.trabajador.findAll({
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
    const responsePlanilla = await fetch("http://10.30.1.42:8084/api/v1/planilla");
    const responsePersonal = await fetch("http://10.30.1.42:8084/api/v1/personal");

    const planillaData = await responsePlanilla.json();
    const personalData = await responsePersonal.json();
    const existingData = await db.trabajador.findAll();

    // Crear un mapa de personal basado en el DNI
    const personalMap = new Map();
    personalData.data.forEach((item) => {
      personalMap.set(item.docum_ident, item.empleado);
    });

    // Formatear los datos externos
    const formatExternalData = planillaData.data.map((item) => {
      return {
        dni: item.NU_DOCU,
        nombres: item.DE_NOMB,
        apellido_paterno: item.AP_PATE,
        apellido_materno: item.AP_MATE,
        de_func: item.DE_FUNC,
        codigo: personalMap.get(item.NU_DOCU) || null,
      };
    });

    const existingMap = new Map(existingData.map(item => [item.dni, item]));

    const toCreate = [];
    const toUpdate = [];

    formatExternalData.forEach((item) => {
      const existingItem = existingMap.get(item.dni);

      if (existingItem) {
        // Verificar si el cargo (de_func) ha cambiado
        if (existingItem.de_func !== item.de_func) {
          toUpdate.push(item);
        }
      } else {
        // Si no existe, agregar a la lista de nuevos registros
        toCreate.push(item);
      }
    });

    // Insertar nuevos registros
    if (toCreate.length > 0) {
      await db.trabajador.bulkCreate(toCreate);
    }

    // Actualizar registros existentes si ha cambiado el cargo
    for (const item of toUpdate) {
      await db.trabajador.update(
        { de_func: item.de_func }, // Solo actualiza el campo de_func
        { where: { dni: item.dni } }
      );
    }

    // Enviar la respuesta al cliente
    return res.json({
      msg: "Actualización completa",
      nuevosRegistros: toCreate.length,
      registrosActualizados: toUpdate.length,
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
