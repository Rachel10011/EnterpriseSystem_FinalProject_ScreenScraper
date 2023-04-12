const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");
const axios = require("axios");

// Get all items
router.post("/get-all-items", async (req, res) => {
  console.log("trying items")

    // console.log(req.body.email)

    // email = req.params.email
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


  //Add new item
  router.post("/AddItem", async (req, res) => {

    const addDetails = {email: req.body.email, url: req.body.url}
    // console.log(addDetails.email, addDetails.url)

    //call scraper
    scraperURL = "http://127.0.0.1:5000/scrape"
    const scraperResponse = await axios.post(scraperURL, {
      URL: req.body.url
    })
   
    console.log("tried callin scraper")
    console.log({scraperResponse})

    if(scraperResponse.data) {
      console.log("works")
      console.log(typeof scraperResponse.data.Price);
      scraperResponse.data.Price = Number(scraperResponse.data.Price.slice(1))
      console.log(typeof scraperResponse.data.Price);

      const item = new Item({
        itemName: scraperResponse.data.Name,
        originalPrice: scraperResponse.data.Price,
        newPrice: scraperResponse.data.Price,
        rating: scraperResponse.data.Rating,
        reviewTotal: scraperResponse.data.ReviewCount,
        availability: scraperResponse.data.Availability,
        url: req.body.url,
        email: req.body.email,
      });

      try {
        const newItem = await item.save()
        console.log("added");

        res.status(201).json(newItem)
      } catch (err) {
        console.log("not added")
        res.status(400).json({ message: err.message })
      } 

    }
    else {
      console.log("noo")
      res.status(400).json("The item could not be scraped")
    }

    // const item = new Item({
    //   itemName: req.body.itemName,
    //   originalPrice: req.body.originalPrice,
    //   newPrice: req.body.originalPrice,
    //   rating: req.body.rating,
    //   reviewTotal: req.body.reviewTotal,
    //   availability: req.body.availability,
    //   url: req.body.url,
    //   email: req.body.email
    // })

    // try {
    //   const newItem = await item.save()
    //   res.status(201).json(newItem)
    // }
    // catch(err) {
    //   res.status(400).json({message: err.message})
    // }
  });


  module.exports = router;
