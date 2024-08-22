const express = require('express');
const { getEquipo, postEquipo, updateEquipo, deleteEquipo, getEquipoChart, getEquipoSelect, equiposBienesSiga, asignarBienesTrabajador, postVariosEquipo } = require('../controllers/equipos');
const router = express.Router();

router.get("/", getEquipo)
router.get("/select", getEquipoSelect)
router.get("/estadisticas", getEquipoChart)
router.get("/bienes", equiposBienesSiga)
router.get("/bienes/trabajador", asignarBienesTrabajador)
router.post("/", postEquipo)
router.post("/varios", postVariosEquipo)
router.put("/:id", updateEquipo)
router.delete("/:id", deleteEquipo)

module.exports = router