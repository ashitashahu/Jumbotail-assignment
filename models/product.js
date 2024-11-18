const mongoose = require('mongoose');

// Define Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    weight: {
      type: Number, // weight in kg
      required: true,
    },
    dimensions: {
      length: { type: Number, required: true }, // cm
      width: { type: Number, required: true },  // cm
      height: { type: Number, required: true }, // cm
    },
    sellingPrice: {
      type: Number,
      required: true, // selling price in Rs
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create the Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
