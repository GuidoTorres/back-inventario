const db = require("../../app/models/index");
const getDependencia = async (req, res) => {
  try {
    const dependencia = await db.dependencia.findAll();
    return res.json({ data: dependencia });
  } catch (error) {
    console.log(error);
  }
};
const postDependencia = async (req, res) => {
  try {
    
    await db.dependencia.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateDependencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.dependencia.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteDependencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.dependencia.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getDependencia,
  postDependencia,
  updateDependencia,
  deleteDependencia,
};
