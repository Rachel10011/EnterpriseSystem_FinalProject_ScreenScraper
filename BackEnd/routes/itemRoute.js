const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");

//Get all items
router.post("/get-all-items", async (req, res) => {
    try {
      const items = await Item.find(req.body.email).select({
        itemName:1,
        originalPrice: 1, 
          newPrice:1, 
          rating: 1, 
          reviewTotal: 1, 
          availability: 1, 
          url: 1, 
          email: 1,
          _id:0
      });
  
      res.json(items);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;
