const express = require('express')
const router = express.Router();

const DiscountsController = require('../Controller/Discounts/Discounts');

router.get('/DiscountsFetch', DiscountsController.DiscountsFetch);

module.exports = router;