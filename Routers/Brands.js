const express = require('express')
const router = express.Router();

const BrandsController = require('../Controller/Brands/Brands');

router.get('/BrandsFetch', BrandsController.BrandsFetch);

module.exports = router;