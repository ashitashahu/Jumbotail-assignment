require('dotenv').config();  
    
const express = require("express");
const connectDB = require("./config/db");
const warehouseRoutes = require("./routes/warehouseRoutes");
const shippingChargeRoutes = require("./routes/shippingChargeRoutes");
const app = express();

app.use(express.json()); 

connectDB();

app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/shipping-charge", shippingChargeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
