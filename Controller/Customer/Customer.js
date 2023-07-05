const express = require("express");
const db = require("../../Config/db");
const joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.CustomerRegistration = (req, res) => {
  var customer = req.body;

  var schema = joi.object({
    customer_name: joi.string().required(),
    customer_email: joi.string().required(),
    customer_mobile: joi.number().required(),
    customer_password: joi.string().required(),
  });
  var validate = schema.validate({
    customer_name: customer.customer_name,
    customer_email: customer.customer_email,
    customer_mobile: customer.customer_mobile,
    customer_password: customer.customer_password,
  });

  if (typeof validate.error !== "undefined") {
    return res.json({
      validate: false,
      message: validate.error.details[0].message,
    });
  }
  customer.customer_otp = Math.floor(Math.random() * 1000000);

  db.query(
    "SELECT * FROM customers WHERE customer_email = ?",
    [customer.customer_email],
    (err, data) => {
      if (err) {
        return res.json({
          success: false,
          message: "Oops Something Went wrong",
          error: err,
        });
      } else {
        if (data.length) {
          return res.json({ success: false, message: "Email Already Used" });
        } else {
          db.query("INSERT INTO customers SET ?", [customer], (err, data) => {
            if (err) {
              return res.json({
                success: false,
                message: "Oops something went wrong",
                error: err,
              });
            } else {
              return res.json({
                success: true,
                message: "Customer Created successfully!",
              });
            }
          });
        }
      }
    }
  );
};

exports.CustomerLogin = (req, res) => {
  var Email = req.body.customer_email;
  var Password = req.body.customer_password;

  var schema = joi.object({
    customer_email: joi.string().required(),
    customer_password: joi.string().required(),
  });
  var validate = schema.validate({
    customer_email: Email,
    customer_password: Password,
  });

  if (typeof validate.error !== "undefined") {
    return res.json({
      validate: true,
      message: validate.error.details[0].message,
    });
  }

  db.query(
    "SELECT * FROM customers WHERE customer_email = ?",
    [Email],
    (err, data) => {
      if (err) {
        return res.json({
          success: false,
          message: "Oops Something went wrong",
          error: err,
        });
      } else {
        if (data.length) {
          if (data[0].customer_password == Password) {
            var token = jwt.sign(
              { id: data[0].customer_id },
              process.env.TOKEN_SECRET,
              {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
              }
            );
            data[0].token = token;
            return res.json({ success: true });
          } else {
            return res.json({
              success: false,
              message: "Invalid Credentials",
            });
          }
        } else {
          return res.json({
            success: false,
            message: "Invalid Credentials",
          });
        }
      }
    }
  );
};

exports.VerifyOTP = (req, res) => {
  var customer_id = req.body.customer_id;
  var customer_otp = req.body.customer_otp;

  var schema = joi.object({
    customer_id: joi.string().required(),
    customer_otp: joi.string().required(),
  });
  var validate = schema.validate({
    customer_id: customer_id,
    customer_otp: customer_otp,
  });

  if (typeof validate.error !== "undefined") {
    return res.json({
      validate: true,
      message: validate.error.details[0].message,
    });
  }
  db.query(
    "SELECT * FROM customers WHERE customer_id = ? ",
    [customer_id],
    (err, data) => {
      //   console.log(data);
      if (err) {
        return res.json({
          success: true,
          mesasge: "Oops something went wrong",
          error: err,
        });
      } else {
        // console.log(data.customer_otp);
        if (data[0].customer_otp == customer_otp) {
          db.query(
            "UPDATE customers SET customer_status = 1 WHERE customer_id = ?",
            [customer_id],
            (err, data) => {
              if (err) {
                return res.json({
                  success: false,
                  message: "Ooops something went wrong",
                });
              } else {
                return res.json({ success: true, message: "OTP Verified !" });
              }
            }
          );
        } else {
          return res.json({ success: false, message: "Wrong OTP Entered" });
        }
      }
    }
  );
};
