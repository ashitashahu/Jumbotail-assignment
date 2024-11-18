const shippingChargeService = require('../services/shippingChargeService');
const warehouseService = require('../services/warehouseService');

const calculateShippingCharge = async (req, res) => {
    try {
        const { sellerId, customerId, deliverySpeed } = req.body;

        // Placeholder: Retrieve seller, customer info (to be implemented)
        const sellerLocation = { lat: 12.992, lng: 37.911 }; // Example Seller Location
        const customerLocation = { lat: 11.232, lng: 23.445495 }; // Example Customer Location

        // Get nearest warehouse
        const warehouse = await warehouseService.getNearestWarehouse(sellerLocation);

        if (!warehouse) {
            return res.status(404).json({ message: 'No warehouse found' });
        }

        // Calculate distance from warehouse to customer
        const distance = warehouseService.calculateDistance(warehouse.location, customerLocation);

        // Placeholder: Get product weight (for simplicity, let's assume a static value)
        const weight = 10; // Example weight (10 kg)

        // Calculate shipping charge
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
