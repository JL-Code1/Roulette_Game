require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const { setupGraphQL } = require("./src/graphql/schema.js"); 
const app = express();

// Middleware
const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:5001",
    "https://studio.apollographql.com"
]; // Add frontend URL to this array, maybe github pages URL

const corsOptions = {
    origin: "http://localhost:5173", // ✅ Set frontend explicitly
    credentials: true, // ✅ Allow credentials (important for tokens)
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow required headers
    methods: ["GET", "POST", "OPTIONS"] // ✅ Allow only necessary methods
  };
  
  app.use(cors(corsOptions));
  console.log("✅ CORS configured with allowed origins:", allowedOrigins);
  

connectDB().catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
});

setupGraphQL(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
