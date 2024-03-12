const db = require("../../app/models/index");
const getTrabajador = async (req, res) => {
  try {
    const trabajador = await db.trabajador.findAll({
      include: [{ model: db.equipo }, { model: db.cargo }],
    });
    return res.json({ data: trabajador });
  } catch (error) {
    console.log(error);
  }
};
const getTrabajadorSelect = async (req, res) => {
  try {
    const trabajador = await db.trabajador.findAll({
      
    });

    const format = trabajador.map(item =>{
      return{
        id: item.id,
        nombre: item.nombres +" "+ item.apellido_paterno +" "+ item.apellido_materno 
      }
    })
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

module.exports = {
  getTrabajador,
  getTrabajadorSelect,
  postTrabajador,
  updateTrabajador,
  deleteTrabajador,
};
