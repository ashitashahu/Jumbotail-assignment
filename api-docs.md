API Documentation: E-Commerce Shipping Charge Estimator
Overview
The E-Commerce Shipping Charge Estimator API facilitates efficient logistics management for a B2B e-commerce marketplace. It calculates the shipping charges for products delivered from sellers to customers via warehouses based on distance, transport mode, and delivery speed.

Endpoints
1. Get the Nearest Warehouse for a Seller
Returns the nearest warehouse for a seller to drop off the product.

Endpoint:
GET /api/v1/warehouse/nearest

Query Parameters:

sellerId (string) - ID of the seller.
productId (string) - ID of the product.
Sample Request:

bash
Copy code
GET /api/v1/warehouse/nearest?sellerId=123&productId=456
Response:

json
Copy code
{
  "warehouseId": 789,
  "warehouseLocation": {
    "lat": 12.99999,
    "long": 37.923273
  }
}

2. Get the Shipping Charge for a Customer from a Warehouse
Calculates the shipping charge based on the distance between the warehouse and the customer, the transport mode, and delivery speed.

Endpoint:
GET /api/v1/shipping-charge

Query Parameters:

warehouseId (string) - ID of the warehouse.
customerId (string) - ID of the customer.
deliverySpeed (string) - Delivery speed (standard or express).
Sample Request:

bash
Copy code
GET /api/v1/shipping-charge?warehouseId=789&customerId=456&deliverySpeed=standard
Response:

json
Copy code
{
  "shippingCharge": 150.00
}


3. Get the Shipping Charges for a Seller and Customer
Combines nearest warehouse retrieval and shipping charge calculation.

Endpoint:
POST /api/v1/shipping-charge/calculate

Request Body:

json
Copy code
{
  "sellerId": 123,
  "customerId": 456,
  "deliverySpeed": "express"
}
Response:

json
Copy code
{
  "shippingCharge": 180.00,
  "nearestWarehouse": {
    "warehouseId": 789,
    "warehouseLocation": {
      "lat": 12.99999,
      "long": 37.923273
    }
  }
}
Transport Modes and Rates
Transport Mode	Distance Range	Rate
Aeroplane	500Km+	₹1 per km per kg
Truck	100Km+	₹2 per km per kg
Mini Van	0–100Km	₹3 per km per kg
Delivery Speed Charges
Delivery Speed	Additional Charges
Standard	₹10 standard courier charge + calculated shipping charge
Express	₹10 courier charge + ₹1.2 per kg + calculated shipping charge
Entities
1. Customer
Customer ID	Name	Location
Cust-123	Shree Kirana Store	{ lat: 11.232, lng: 23.445495 }
Cust-124	Andheri Mini Mart	{ lat: 17.232, lng: 33.445495 }
2. Seller and Product
Seller Name	Product Name	Price	Attributes
Nestle Seller	Maggie	₹10	{ weight: 0.5kg, dimension: 10x10x10 cm }
Rice Seller	Rice Bag	₹500	{ weight: 10kg, dimension: 100x80x50 cm }
Sugar Seller	Sugar Bag	₹700	{ weight: 25kg, dimension: 100x90x60 cm }
3. Warehouse
Warehouse Name	Location
BLR_Warehouse	{ lat: 12.99999, lng: 37.923273 }
MUMB_Warehouse	{ lat: 11.99999, lng: 27.923273 }
Error Handling
Error Code	Message	Cause
400	sellerId and productId query parameters are required	Missing required query parameters.
404	Seller not found	Invalid sellerId.
404	No warehouses found	No warehouse located near the seller.
500	Server error	Internal server error or unhandled exceptions.
Testing Recommendations
Unit Tests:

Validate each endpoint for valid and invalid inputs.
Test calculations for shipping charges with edge cases.
Integration Tests:

Test flow from seller to customer via warehouse.
Edge Cases:

No nearby warehouses.
Invalid sellerId or productId.
Missing or incorrect delivery speed.


Setup Instructions
Refer to the README.md in the GitHub repository for setup and usage instructions.