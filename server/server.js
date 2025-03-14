require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const { setupGraphQL } = require("./src/graphql/schema.js");
const path = require("path");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  "https://studio.apollographql.com",
  "https://roulette-game-8vp5.onrender.com"
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "OPTIONS"]
};

app.use(cors(corsOptions));
console.log("✅ CORS configured with allowed origins:", allowedOrigins);

// GraphQL setup should be done before the catch-all route if it needs to handle specific paths
setupGraphQL(app);

// Connect to MongoDB
connectDB().catch((error) => {
  console.error("❌ MongoDB Connection Error:", error);
  process.exit(1);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

