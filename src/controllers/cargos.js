const db = require("../../app/models/index");
const getCargo = async (req, res) => {
  try {
    const cargo = await db.cargo.findAll({
      include: [
        {
          model: db.unidad,
          include: [{ model: db.base, include: [{ model: db.dependencia }] }],
        },
      ],
    });
    return res.json({ data: cargo });
  } catch (error) {
    console.log(error);
  }
};
const postCargo = async (req, res) => {
  try {
    console.log(req.body);
    await db.cargos.create(req.body);

    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateCargo = async (req, res) => {
  try {
    const id = req.params.id;
    await db.cargos.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteCargo = async (req, res) => {
  try {
    const id = req.params.id;
    await db.cargos.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getCargo,
  postCargo,
  updateCargo,
  deleteCargo,
};
