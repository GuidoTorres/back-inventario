const db = require("../../app/models/index");
const { encrypt } = require("../helpers/handleBcrypt");


const getUsuario = async (req, res, next) => {
    try {
      const all = await db.usuario.findAll();
      const format = all.map((item, i) => {
        return {
          nro: i + 1,
          ...item.dataValues,
        };
      });
      return res.status(200).json({ data: format });
    } catch (error) {
      res.status(500).json();
    }
  };
  
  
  const postUsuario = async (req, res, next) => {
    const { nombre, contrasenia, estado, tipo} = req.body;
    if (!nombre || !contrasenia) {
      return res.status(400).json({ msg: "Faltan campos requeridos" });
    }
    const passwordHash = await encrypt(contrasenia);
    let info = {
      nombre,
      usuario: req.body.usuario,
      contrasenia: passwordHash,
      estado: estado || true,
    };
  
    try {
      const getUser = await db.usuario.findAll({
        where: { usuario: info.usuario },
      });
  
      if (getUser.length > 0) {
        return res.status(409).json({
          msg: "El nombre de usuario ya existe, intente con otro!",
          status: 500,
        });
      } else {
        const nuevoUsuario = await db.usuario.create(info);
        return res.status(200).json({
          data: nuevoUsuario,
          msg: "Usuario creado con éxito!",
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "No se pudo crear.", status: 500 });
    }
  };
  
  const updateUsuario = async (req, res, next) => {
    let id = req.params.id;
  
    let info = {
      nombre: req.body.nombre,
      usuario: req.body.usuario,
      estado: Boolean(req.body.estado),
    };
    try {
      await db.usuario.update(info, { where: { id: id } });
      return res
        .status(200)
        .json({ msg: "Usuario actualizado con éxito!", status: 200 });
    } catch (error) {
      res.status(500).json({ msg: "No se pudo actualizar", status: 500 });
    }
  };
  
  const deleteUsuario = async (req, res, next) => {
    let id = req.params.id;
    try {

      await db.usuario.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ msg: "Usuario eliminado con éxito!", status: 200 });
    } catch (error) {
  
      res.status(500).json({ msg: "No se pudo eliminar", status: 500 });
    }
  };

  module.exports ={
    getUsuario, postUsuario, updateUsuario, deleteUsuario
  }