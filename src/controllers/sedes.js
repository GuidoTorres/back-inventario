const db = require("../../app/models/index");
const getSedes = async (req, res) => {
  try {
    const sedes = await db.sedes.findAll({
      attributes:["id", "nombre"],
    });
    return res.json({ data: sedes });
  } catch (error) {
    console.log(error);
  }
};
const postSedes = async (req, res) => {
  try {
    await db.sedes.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateSedes = async (req, res) => {
  try {
    const id = req.params.id;
    await db.sedes.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteSedes = async (req, res) => {
  try {
    const id = req.params.id;
    await db.sedes.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getSedes,
  postSedes,
  updateSedes,
  deleteSedes,
};
