require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leadsRouter = require("./routes/leads");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lead-manager";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Lead Manager API is running" });
});

app.use("/leads", leadsRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
