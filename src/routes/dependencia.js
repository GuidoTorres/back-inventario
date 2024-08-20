const express = require('express');
const { getDependencia, postDependencia, updateDependencia, deleteDependencia, getDependenciaSelect } = require('../controllers/dependencia');
const router = express.Router();

router.get("/", getDependencia)
router.get("/select", getDependenciaSelect)
router.post("/", postDependencia)
router.put("/:id", updateDependencia)
router.delete("/:id", deleteDependencia)

module.exports = router