const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  name: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      weight: { type: Number, required: true }, // in kg
      dimensions: { type: Object, required: true }, // { length: cm, breadth: cm, height: cm }
    },
  ],
});

module.exports = mongoose.model('Seller', sellerSchema);
