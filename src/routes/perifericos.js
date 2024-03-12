const express = require('express');
const { getPeriferico, postPeriferico, updatePeriferico, deletePeriferico } = require('../controllers/perifericos');
const router = express.Router();

router.get("/", getPeriferico)
router.post("/", postPeriferico)
router.put("/:id", updatePeriferico)
router.delete("/:id", deletePeriferico)

module.exports = router