const express = require("express");
const router = express.Router();
const shippingChargeController = require("../controllers/shippingChargeController");

router.post("/calculate", shippingChargeController.calculateShippingCharge);

module.exports = router;
