require('dotenv').config();  // Load environment variables from .env file
    
const express = require("express");
const connectDB = require("./config/db");
const warehouseRoutes = require("./routes/warehouseRoutes");
const shippingChargeRoutes = require("./routes/shippingChargeRoutes");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // For parsing application/json

// Connect to Database
connectDB();

// Use Routes
app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/shipping-charge", shippingChargeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
