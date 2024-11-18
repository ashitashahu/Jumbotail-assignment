const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Warehouse = require('../models/warehouse');
const Customer = require('../models/customer');

// Mock data
const warehouseData = {
  location: { lat: 12.99999, lng: 37.923273 },
};

const customerData = {
  name: 'Shree Kirana Store',
  location: { lat: 11.232, lng: 23.445495 },
  weight: 10,  // 10 kg product weight
};

const warehouse = new Warehouse(warehouseData);
const customer = new Customer(customerData);

// Jest setup
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Add warehouse and customer for testing
  await warehouse.save();
  await customer.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/v1/shipping-charge/calculate', () => {
  it('should return the correct shipping charge for a standard delivery', async () => {
    const res = await request(app)
      .get('/api/v1/shipping-charge/calculate')
      .query({ warehouseId: warehouse._id, customerId: customer._id, deliverySpeed: 'standard' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('shippingCharge');
    expect(parseFloat(res.body.shippingCharge)).toBeGreaterThan(0);
  });

  it('should return the correct shipping charge for an express delivery', async () => {
    const res = await request(app)
      .get('/api/v1/shipping-charge/calculate')
      .query({ warehouseId: warehouse._id, customerId: customer._id, deliverySpeed: 'express' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('shippingCharge');
    expect(parseFloat(res.body.shippingCharge)).toBeGreaterThan(0);
  });

  it('should return 404 if the warehouse or customer is not found', async () => {
    const res = await request(app)
      .get('/api/v1/shipping-charge/calculate')
      .query({ warehouseId: mongoose.Types.ObjectId(), customerId: customer._id, deliverySpeed: 'standard' });

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe('Warehouse or Customer not found');
  });
});
