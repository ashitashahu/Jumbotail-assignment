const warehouseService = require("../services/warehouseService");

const getNearestWarehouse = async (req, res) => {
  try {
    const { sellerId, productId } = req.query;
    if (!sellerId || !productId) {
      return res
        .status(400)
        .json({
          message: "sellerId and productId query parameters are required",
        });
    }

    const seller = await warehouseService.getSellerLocation(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const warehouse = await warehouseService.getNearestWarehouse(
      seller,
      productId
    );

    if (!warehouse) {
      return res.status(404).json({ message: "No warehouses found" });
    }

    res.json({
      warehouseId: warehouse.warehouseId,
      warehouseLocation: warehouse.location,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getNearestWarehouse };
