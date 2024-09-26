const db = require("../../app/models/index");
const getSubDependencia = async (req, res) => {
  try {
    const dependencia = await db.sub_dependencias.findAll({
      attributes: ["id", "nombre", "dependencia_id"],
      include: [
        {model: db.dependencias, attributes: ["nombre"]},
        { model: db.modulos, attributes: ["nombre"] },
        { model: db.sedes, attributes: ["nombre"] },
      ],
    });
    return res.json({ data: dependencia });
  } catch (error) {
    console.log(error);
  }
};
const getSubDependenciaSelect = async (req, res) => {
    try {
      const dependencia = await db.sub_dependencias.findAll({
        attributes: ["id", "nombre"],

      });
      return res.json({ data: dependencia });
    } catch (error) {
      console.log(error);
    }
  };
const postSubDependencia = async (req, res) => {
  try {
    await db.sub_dependencias.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateSubDependencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.sub_dependencias.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteSubDependencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.sub_dependencias.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getSubDependencia,
  getSubDependenciaSelect,
  postSubDependencia,
  updateSubDependencia,
  deleteSubDependencia,
};
