const express = require('express')
const router = express.Router();

const ProductsController = require('../Controller/Products/Products');

router.get('/ProductsFetch', ProductsController.ProductsFetch);

module.exports = router;