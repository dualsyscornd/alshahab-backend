const express = require("express");
const router = express.Router();

const CustomerController = require("../Controller/Customer/Customer");

router.post("/CustomerRegistration", CustomerController.CustomerRegistration);
router.post("/CustomerLogin", CustomerController.CustomerLogin);
router.post("/VerifyOTP", CustomerController.VerifyOTP);

module.exports = router;
