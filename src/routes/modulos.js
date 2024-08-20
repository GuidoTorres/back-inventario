const express = require('express');
const { getModulos, postModulos, updateModulos, deleteModulos } = require('../controllers/modulos');
const router = express.Router();

router.get("/", getModulos)
router.post("/", postModulos)
router.put("/:id", updateModulos)
router.delete("/:id", deleteModulos)

module.exports = router