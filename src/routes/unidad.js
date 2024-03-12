const express = require('express');
const { getUnidad, postUnidad, updateUnidad, deleteUnidad } = require('../controllers/unidad');
const router = express.Router();

router.get("/", getUnidad)
router.post("/", postUnidad)
router.put("/:id", updateUnidad)
router.delete("/:id", deleteUnidad)

module.exports = router