const express = require('express')
const router = express.Router();

const AttributesController = require('../Controller/Attributes/Attributes');

router.get('/AttributesFetch', AttributesController.AttributesFetch);

module.exports = router;