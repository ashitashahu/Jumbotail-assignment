const mongoose = require('mongoose');

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
      type: Number, 
      required: true,
    },
    dimensions: {
      length: { type: Number, required: true }, 
      width: { type: Number, required: true },  
      height: { type: Number, required: true }, 
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
