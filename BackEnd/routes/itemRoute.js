const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Item = require("../models/item");
const axios = require("axios");



  //Add new item
  router.post("/AddItem", async (req, res) => {

    // Check if the item requested is already being tracked by the user, else send the url to the scraper
    const checkIfURLExists = await Item.findOne({ url: req.body.url })

    if(checkIfURLExists && checkIfURLExists.email == req.body.email) {
      res.status(201).json("This item is already being tracked");
    }
    else {

      //Call scraper
       scraperURL = "http://127.0.0.1:5000/scrape";

       const scraperResponse = await axios.post(scraperURL, {
         URL: req.body.url,
       });

       if (scraperResponse.data) {

         // Remove the '$' and convert it to a Number type
         scraperResponse.data.Price = Number(
           scraperResponse.data.Price.slice(1)
         );

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
           const newItem = await item.save();

           res.status(201).json(newItem);
         } catch (err) {
           res.status(400).json({ message: err.message });
         }
       } else {
         res.status(400).json("The item could not be scraped");
       }
    }

  });

  // Manual price check
  router.patch("/UpdatePrice", async (req, res) => {

     scraperURL = "http://127.0.0.1:5000/scrape"

     const scraperResponse = await axios.post(scraperURL, {
       URL: req.body.url,
     });

     let item = await Item.findOne({url: req.body.url})
     oldPrice = item.newPrice

    //Hard coded test
    // scraperResponse.data.Price = 88.98

     if(item.newPrice > scraperResponse.data.Price) {
      item.newPrice = scraperResponse.data.Price

      try {
        await item.save()

        res.status(201).json("A lower price was found! This item is currently $" 
        + item.newPrice 
        + " on Amazon, down from $" + oldPrice)

      } catch (err) {
        res.status(400).json({ message: err.message })
      } 
     }
     else {
      res.status(201).json("There is currently not a lower price")
     }
  })


  module.exports = router;
