const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Warehouse = require('../models/warehouse');
const Product = require('../models/product');

const warehouseData = {
  location: { lat: 12.99999, lng: 37.923273 },
};

const productData = {
  name: 'Maggie',
  sellerId: mongoose.Types.ObjectId(),
  weight: 0.5,
  dimensions: { length: 10, width: 10, height: 10 },
  sellingPrice: 10,
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const warehouse = new Warehouse(warehouseData);
  await warehouse.save();

  productData.sellerLocation = { lat: 11.232, lng: 23.445495 };
  const product = new Product(productData);
  await product.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/v1/warehouse/nearest', () => {
  it('should return the nearest warehouse for a seller', async () => {
    const res = await request(app)
      .get('/api/v1/warehouse/nearest')
      .query({ sellerId: productData.sellerId, productId: productData._id });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('warehouseId');
    expect(res.body.warehouseLocation).toEqual(warehouseData.location);
  });

  it('should return 404 if no warehouses are found', async () => {
    await Warehouse.deleteMany({});
    
    const res = await request(app)
      .get('/api/v1/warehouse/nearest')
      .query({ sellerId: productData.sellerId, productId: productData._id });
    
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe('No warehouses found');
  });
});
