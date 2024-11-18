const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router.get("/nearest", warehouseController.getNearestWarehouse);

module.exports = router;
