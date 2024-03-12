const db = require("../../app/models/index");
const getPeriferico = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll();
    return res.json({ data: equipo });
  } catch (error) {
    console.log(error);
  }
}
const postPeriferico = async (req, res) => {
  try {
    
    await db.equipo.create(req.body);

    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updatePeriferico = async (req, res) => {
  try {
    const id = req.params.id;
    await db.equipo.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deletePeriferico = async (req, res) => {
  try {
    const id = req.params.id;
    await db.equipo.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getPeriferico,
  postPeriferico,
  updatePeriferico,
  deletePeriferico,
};
