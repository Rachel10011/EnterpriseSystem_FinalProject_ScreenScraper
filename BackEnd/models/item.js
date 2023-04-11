const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  }, 
  newPrice: {
    type: Number,
    required: true
  }, 
  rating: {
    type: String,
    required: true
  }, 
  reviewTotal: {
    type: String,
    required: true
  }, 
  availability: {
    type: String,
    required: true
  }, 
  url: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  }
  
})

module.exports = mongoose.model('Item', itemSchema)