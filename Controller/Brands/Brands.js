const express = require("express");
const db = require("../../Config/db");

exports.BrandsFetch = (req, res) => {
  db.query("SELECT * FROM brands", (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Oops Something went wrong",
        error: err,
      });
    } else {
      if (data.length) {
        return res.json({ success: true, data: data });
      } else {
        return res.json({ success: false, message: "data Not Found" });
      }
    }
  });
};
