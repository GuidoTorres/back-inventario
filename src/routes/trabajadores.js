const express = require('express');
const { getTrabajador, postTrabajador, updateTrabajador, deleteTrabajador, getTrabajadorSelect, trabajadoresPlanilla, updateTrabajadorEstado } = require('../controllers/trabajador');
const router = express.Router();

router.get("/", getTrabajador)
router.get("/select", getTrabajadorSelect)
router.get("/planilla", trabajadoresPlanilla)
router.get("/estado/:id", updateTrabajadorEstado)
router.post("/", postTrabajador)
router.put("/:id", updateTrabajador)
router.delete("/:id", deleteTrabajador)

module.exports = router
