const express = require('express')
const router = express.Router();

const Home__slidersController = require('../Controller/Home__sliders/Home__sliders');

router.get('/Home__slidersFetch', Home__slidersController.Home__slidersFetch);

module.exports = router;