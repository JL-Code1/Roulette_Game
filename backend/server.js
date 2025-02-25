require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const setupGraphQL = require("./config/graphql");

const app = express();

// Connect to MongoDB
connectDB();

// Set up GraphQL
setupGraphQL(app);

const PORT = process.env.PORT || 5173

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
}); 