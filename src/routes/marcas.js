const express = require('express');
const { getMarcas } = require('../controllers/marcas');
const router = express.Router();

router.get("/", getMarcas)


module.exports = router