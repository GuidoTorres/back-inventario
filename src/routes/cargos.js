const express = require('express');
const { getCargo, postCargo, updateCargo, deleteCargo } = require('../controllers/cargos');
const router = express.Router();

router.get("/", getCargo)
router.post("/", postCargo)
router.put("/:id", updateCargo)
router.delete("/:id", deleteCargo)

module.exports = router