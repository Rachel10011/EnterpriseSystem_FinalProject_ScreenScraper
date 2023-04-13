const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Client = require("../models/client");

router.post("/register", async (req, res) => {
  
  const client = await Client.findOne({ email: req.body.email })
  
  if (!client) {
    const client = new Client({
      email: req.body.email,
      password: req.body.password,
    })

    try {
      await client.save()
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
    const registerStatus = "Account creation successful! Please login with these credentials"
    res.status(201).json({ registerStatus })
  } else {
    const registerStatus = "Sorry, that username already exists. Please try again"
    res.status(401).json({ registerStatus })
  }

})

router.post("/login", async (req, res) => {
  const client = await Client.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if (client != null) {
    res.status(201).json(client.email + " has successfully logged in")
   
  } else {
    res.status(401).json("Email or password is incorrect, please try again")
  }
})


module.exports = router

