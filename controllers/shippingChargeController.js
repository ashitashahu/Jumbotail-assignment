const shippingChargeService = require('../services/shippingChargeService');
const warehouseService = require('../services/warehouseService');

const calculateShippingCharge = async (req, res) => {
    try {
        const { sellerId, customerId, deliverySpeed } = req.body;

        const sellerLocation = { lat: 12.992, lng: 37.911 }; 
        const customerLocation = { lat: 11.232, lng: 23.445495 }; 
        const warehouse = await warehouseService.getNearestWarehouse(sellerLocation);

        if (!warehouse) {
            return res.status(404).json({ message: 'No warehouse found' });
        }

        const distance = warehouseService.calculateDistance(warehouse.location, customerLocation);

        const weight = 10; 

        const shippingCharge = shippingChargeService.calculateShippingCharge(distance, weight, deliverySpeed);

        res.json({
            shippingCharge: shippingCharge,
            nearestWarehouse: {
                warehouseId: warehouse.warehouseId,
                warehouseLocation: warehouse.location
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { calculateShippingCharge };
