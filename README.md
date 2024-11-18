# E-Commerce Shipping Charge Estimator

## Problem Statement
The **E-Commerce Shipping Charge Estimator** application calculates the shipping charges for delivering products in a B2B e-commerce marketplace. It provides APIs for determining the nearest warehouse, shipping charges, and delivery logistics for Kirana stores.

---

## Entities

### Customer
Stores complete details of the customer, including location:

  {
    "customerId": "Cust-123",
    "name": "Shree Kirana Store",
    "phone": "9847******",
    "location": { "lat": 11.232, "lng": 23.445495 }
  }

Seller and Product
Stores seller and product details:

Example:


{
  "sellerId": "Seller-001",
  "name": "Nestle Seller",
  "products": [
    {
      "productId": "Prod-001",
      "name": "Maggie 500g Packet",
      "price": 10,
      "attributes": {
        "weight": 0.5,
        "dimensions": { "length": 10, "breadth": 10, "height": 10 }
      }
    }
  ]
}


Warehouse
Stores details of warehouses:

Example:


{
  "warehouseId": "WH-001",
  "name": "BLR_Warehouse",
  "location": { "lat": 12.99999, "lng": 37.923273 }
}


## APIs

1. Get the Nearest Warehouse for a Seller
Endpoint: GET /api/v1/warehouse/nearest
Description: Finds the nearest warehouse for a given seller and product.
Request Parameters:
sellerId: Seller's unique ID.
productId: Product's unique ID.
Sample Request:


GET /api/v1/warehouse/nearest?sellerId=123&productId=456
Sample Response:


{
  "warehouseId": "WH-001",
  "warehouseLocation": { "lat": 12.99999, "lng": 37.923273 }
}


2. Get the Shipping Charge for a Customer from a Warehouse
Endpoint: GET /api/v1/shipping-charge
Description: Calculates the shipping charge based on the warehouse and customer location.
Request Parameters:
warehouseId: Warehouse's unique ID.
customerId: Customer's unique ID.
deliverySpeed: standard or express.

Sample Request:

GET /api/v1/shipping-charge?warehouseId=789&customerId=456&deliverySpeed=standard

Sample Response:

{
  "shippingCharge": 150.00
}

3. Calculate Shipping Charges for a Seller and Customer
Endpoint: POST /api/v1/shipping-charge/calculate
Description: Combines nearest warehouse retrieval and shipping charge calculation.

Request Body:
{
  "sellerId": "Seller-001",
  "customerId": "Cust-123",
  "deliverySpeed": "express"
}

Sample Response:
{
  "shippingCharge": 180.00,
  "nearestWarehouse": {
    "warehouseId": "WH-001",
    "warehouseLocation": { "lat": 12.99999, "lng": 37.923273 }
  }
}


## Setup and Installation

Clone the repository:

    git clone https://github.com/yourusername/shipping-charge-estimator.git

Navigate to the project directory:

    cd shipping-charge-estimator

Install dependencies:

    npm install

Set up the database and environment variables:

    Configure DB_URI, PORT in a .env file.

Start the server:

    npm start

Testing

    npm test


## Key Features
Nearest warehouse detection using geographic distance calculations.
Shipping charge estimation based on delivery speed and transport modes.
Graceful handling of missing/invalid parameters.
Modular, clean, and extensible codebase.
