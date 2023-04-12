const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Client = require("../models/client");

router.post("/register", async (req, res) => {
//   console.log("register");
//   const client = await Client.findOne({ email: req.body.email });
//   if (!client) {
//     console.log("register success");
//     const client = new Client({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     try {
//       await client.save();
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//     const registerStatus =
//       "Account creation successful! Please login with these credentials";
//     res.status(201).json({ registerStatus });
//   } else {
//     console.log("register fail");
//     const registerStatus =
//       "Sorry, that username already exists. Please try again";
//     res.status(201).json({ registerStatus });
//   }

res.status(201)
});


module.exports = router;

