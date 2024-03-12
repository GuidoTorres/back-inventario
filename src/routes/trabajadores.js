const express = require('express');
const { getTrabajador, postTrabajador, updateTrabajador, deleteTrabajador, getTrabajadorSelect } = require('../controllers/trabajador');
const router = express.Router();

router.get("/", getTrabajador)
router.get("/select", getTrabajadorSelect)
router.post("/", postTrabajador)
router.put("/:id", updateTrabajador)
router.delete("/:id", deleteTrabajador)

module.exports = router
