const Warehouse = require("../models/warehouse.js");
const Seller = require("../models/seller.js");

// Function to calculate distance between two geographical points using Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

// Function to get seller location by sellerId and validate productId
const getSellerLocation = async (sellerId, productId) => {
  const seller = await Seller.findOne({ sellerId });

  console.log({ sellerId }, seller);
  if (!seller) {
    throw new Error("Seller not found");
  }

  // Check if the product exists in the seller's products
  const product = seller.products.find((p) => p.productId === productId);
  if (!product) {
    throw new Error("Product not found for the specified seller");
  }

  // Return the seller's location (assuming location is stored in a fixed location in Seller schema)
  return seller.location;
};

// Function to get the nearest warehouse
const getNearestWarehouse = async (sellerLocation) => {
  // Fetch all warehouses from the database
  const warehouses = await Warehouse.find({});
  if (!warehouses || warehouses.length === 0) {
    throw new Error("No warehouses available");
  }

  // Calculate the nearest warehouse
  let nearestWarehouse = null;
  let shortestDistance = Infinity;

  for (let warehouse of warehouses) {
    const distance = calculateDistance(
      sellerLocation.lat,
      sellerLocation.lng,
      warehouse.location.lat,
      warehouse.location.lng
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestWarehouse = warehouse;
    }
  }

  return nearestWarehouse;
};

module.exports = { getNearestWarehouse, getSellerLocation };
