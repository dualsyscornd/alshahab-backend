const express = require('express')
const router = express.Router();

const Products__attributesController = require('../Controller/Products__attributes/Products__attributes');

router.get('/Products__attributesFetch', Products__attributesController.Products__attributesFetch);

module.exports = router;