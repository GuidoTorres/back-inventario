const express = require('express');
const { getEquipo, postEquipo, updateEquipo, deleteEquipo, getEquipoChart, getEquipoSelect } = require('../controllers/equipos');
const router = express.Router();

router.get("/", getEquipo)
router.get("/select", getEquipoSelect)
router.get("/estadisticas", getEquipoChart)
router.post("/", postEquipo)
router.put("/:id", updateEquipo)
router.delete("/:id", deleteEquipo)

module.exports = router