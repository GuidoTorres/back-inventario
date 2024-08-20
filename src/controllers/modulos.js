const db = require("../../app/models/index");
const getModulos = async (req, res) => {
  try {
    const modulos = await db.modulos.findAll({
      attributes:["id", "nombre"],

    });
    return res.json({ data: modulos });
  } catch (error) {
    console.log(error);
  }
};
const postModulos = async (req, res) => {
  try {
    await db.modulos.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateModulos = async (req, res) => {
  try {
    const id = req.params.id;
    await db.modulos.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteModulos = async (req, res) => {
  try {
    const id = req.params.id;
    await db.modulos.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getModulos,
  postModulos,
  updateModulos,
  deleteModulos,
};
