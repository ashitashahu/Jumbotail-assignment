const calculateShippingCharge = (distance, weight, deliverySpeed) => {
    let rate = 0;
    if (distance >= 500) {
        rate = 1 * distance * weight;  // Aeroplane
    } else if (distance >= 100) {
        rate = 2 * distance * weight;  // Truck
    } else {
        rate = 3 * distance * weight;  // Mini Van
    }

    if (deliverySpeed === 'express') {
        rate += 1.2 * weight;  // Express charge
    }

    return rate;
};

module.exports = { calculateShippingCharge };
