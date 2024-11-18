const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    warehouseId: { type: String, required: true },
    name: { type: String, required: true }, 
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
