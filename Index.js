const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();
var cors = require('cors')
// --- Body Parser --- \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// --- Body Parser --- \\

const CategoryRouter = require('./Routers/Cateogy');

if (process.env.ENABLE_CORS) {
    app.use(cors())
  }


app.use('/category', CategoryRouter)
  

app.listen(process.env.PORT, () => {
    console.log(`Pushpak api listening on port ${process.env.PORT}`)
  })