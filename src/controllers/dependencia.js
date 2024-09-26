const db = require("../../app/models/index");
const getDependencia = async (req, res) => {
  try {
    const dependencia = await db.dependencias.findAll({
      attributes:["id", "nombre", "sede_id"],
      include: [
        { model: db.sedes, attributes:["nombre"] },
        { model: db.modulos, attributes:["nombre"]  },
        { model: db.sub_dependencias, attributes:["nombre"]  },
        { model: db.modulos },
      ],
    });
    return res.json({ data: dependencia });
  } catch (error) {
    console.log(error);
  }
};

const getDependenciaSelect = async (req, res) => {
  try {
    const dependencia = await db.dependencias.findAll({
      attributes:["id", "nombre"],
    });
    return res.json({ data: dependencia });
  } catch (error) {
    console.log(error);
  }
};
const postDependencia = async (req, res) => {
  try {
    await db.dependencias.create(req.body);
    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateDependencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.dependencias.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteDependencia = async (req, res) => {
  try {
    const id = req.params.id;
    await db.dependencias.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

module.exports = {
  getDependencia,
  getDependenciaSelect,
  postDependencia,
  updateDependencia,
  deleteDependencia,
};
