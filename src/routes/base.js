const express = require('express');
const { getBase, postBase, updateBase, deleteBase } = require('../controllers/base');
const router = express.Router();

router.get("/", getBase)
router.post("/", postBase)
router.put("/:id", updateBase)
router.delete("/:id", deleteBase)

module.exports = router