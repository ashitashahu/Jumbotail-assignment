const calculateShippingCharge = (distance, weight, deliverySpeed) => {
    let rate = 0;
    if (distance >= 500) {
        rate = 1 * distance * weight;  
    } else if (distance >= 100) {
        rate = 2 * distance * weight;
    } else {
        rate = 3 * distance * weight;  
    }

    if (deliverySpeed === 'express') {
        rate += 1.2 * weight;  
    }

    return rate;
};

module.exports = { calculateShippingCharge };
