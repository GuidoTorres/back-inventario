const db = require("../../app/models/index");
const getUnidad = async (req, res) => {
  try {
    const unidad = await db.unidad.findAll();
    return res.json({ data: unidad });
  } catch (error) {
    console.log(error);
  }
};
const postUnidad = async (req, res) => {
  try {
    
    await db.unidad.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateUnidad = async (req, res) => {
  try {
    const id = req.params.id;
    await db.unidad.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteUnidad = async (req, res) => {
  try {
    const id = req.params.id;
    await db.unidad.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getUnidad,
  postUnidad,
  updateUnidad,
  deleteUnidad,
};
