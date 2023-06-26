const express = require('express')
const router = express.Router();

const CategoryController = require('../Controller/Category/Category');

router.get('/CategoryFetch', CategoryController.CategoryFetch);

module.exports = router;