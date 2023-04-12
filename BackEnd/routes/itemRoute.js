
const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");

//Get all items of the current user
router.get("/get-all-items", async (req, res) => {
  const email = req.query.email
    try {
       const items = await Item.find({email:email});
      res.json(items);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //Delete selected item of the current user
router.delete("/delete-item", async (req, res) => {
  try {
     const deleteItem = await Item.findOne(
      {
        email:req.body.email,
        url: req.body.url,
        itemName:req.body.itemName
    });

    if(deleteItem==null)
    {
      return res.status(404).json({ message: "Cannot find item" });
    }
    await deleteItem.remove();
    res.json({ message: "Item Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  //test add single item
  router.post("/", async (req, res) => {
    console.log("here")
    const item = new Item({
      itemName: req.body.itemName,
      originalPrice: req.body.originalPrice,
      newPrice: req.body.originalPrice,
      rating: req.body.rating,
      reviewTotal: req.body.reviewTotal,
      availability: req.body.availability,
      url: req.body.url,
      email: req.body.email
    })

    try {
      const newItem = await item.save()
      res.status(201).json(newItem)
    }
    catch(err) {
      res.status(400).json({message: err.message})
    }
  });


  module.exports = router;
