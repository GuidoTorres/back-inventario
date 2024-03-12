const db = require("../../app/models/index");
const getBase = async (req, res) => {
  try {
    const base = await db.base.findAll();
    return res.json({ data: base });
  } catch (error) {
    console.log(error);
  }
};
const postBase = async (req, res) => {
  try {
    
    await db.base.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateBase = async (req, res) => {
  try {
    const id = req.params.id;
    await db.base.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteBase= async (req, res) => {
  try {
    const id = req.params.id;
    await db.base.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getBase,
  postBase,
  updateBase,
  deleteBase,
};
