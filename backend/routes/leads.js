const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// POST /leads -> Add a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const lead = await Lead.create({ name, email, status });
    res.status(201).json(lead);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "A lead with this email already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Something went wrong creating the lead" });
  }
});

// GET /leads -> Fetch all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong fetching leads" });
  }
});

module.exports = router;
