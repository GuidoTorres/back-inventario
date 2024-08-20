const express = require('express');
const { getSubDependencia, postSubDependencia, updateSubDependencia, deleteSubDependencia, getSubDependenciaSelect } = require('../controllers/subdependencias');
const { updateDependencia } = require('../controllers/dependencia');
const router = express.Router();

router.get("/", getSubDependencia)
router.get("/select", getSubDependenciaSelect)
router.post("/", postSubDependencia)
router.put("/:id", updateDependencia)
router.delete("/:id", deleteSubDependencia)

module.exports = router