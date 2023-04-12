require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(express.static(__dirname + '/public'));

const clientsRouter = require('./routes/clientRoute')

app.use('/clients', clientsRouter)

const itemsRouter = require('./routes/itemRoute')

app.use('/items', itemsRouter)
app.use(express.json())
app.use((req, res) => {
    // req.body is deserialized body:
    console.log(req.body);
  });   
app.listen(3000, () => console.log('Server Started'))
