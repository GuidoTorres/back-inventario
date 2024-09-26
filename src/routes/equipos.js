const express = require('express');
const { getEquipo, postEquipo, updateEquipo, deleteEquipo, getEquipoChart, getEquipoSelect, equiposBienesSiga, asignarBienesTrabajador, postVariosEquipo, excelEquipos, getEquiposActualizados, getImpresorasPorTipo, getEstadisticasPorDependencia, estadisticasImpresora, equiposBienesSigaComparar, getEquiposInventariados, getEstadisticasLincencias, getEstadisticasPorSubDependencia, getEquipoSede } = require('../controllers/equipos');
const upload = require('../middlewares/multer');
const router = express.Router();

router.get("/", getEquipo)
router.get("/sede", getEquipoSede)

router.get("/inventariados", getEquiposInventariados)
router.get("/actualizados", getEquiposActualizados)

router.get("/select", getEquipoSelect)
router.get("/estadisticas", getEquipoChart)
router.get("/licencias", getEstadisticasLincencias)
router.get("/bienes", equiposBienesSiga)
router.get("/bienes/trabajador", asignarBienesTrabajador)
router.get("/estadistica/impresora", getImpresorasPorTipo)
router.get("/estadistica/dependencias", getEstadisticasPorDependencia)
router.get("/estadistica/subDependencias", getEstadisticasPorSubDependencia)
router.get("/prueba", equiposBienesSigaComparar)

router.post("/", postEquipo)
router.post("/varios", postVariosEquipo)
router.post("/excel", upload.single('file'), excelEquipos)

router.put("/:id", updateEquipo)
router.delete("/:id", deleteEquipo)

module.exports = router