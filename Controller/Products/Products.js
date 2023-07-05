const express = require("express");
const db = require("../../Config/db");
const { executeQuery } = require("../Helper/Utils");

exports.ProductsFetch = (req, res) => {
  var limit = Number(req.query.limit);
  var page = Number(req.query.page);
  var total_pages = 0;
  var total_records = 0;
  var next = true;
  var prev = true;
  var start = (page - 1) * limit;
  var query =
    "SELECT products.*, brands.* FROM products LEFT JOIN brands ON brands.brand_id = products.product_id WHERE products.product_id != 0 ";
  var cond = [];
  var keyword = req.query.keyword;
  var id = req.query.id;
  var column = req.query.column;

  if (keyword) {
    query += `AND products.product_name LIKE '%${keyword}%'`;
  }

  if (id && column) {
    query += `AND ${column} LIKE '%${id}%'`;
  }

  db.query(query, async (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: "Oops Something went wrong",
        error: err,
      });
    } else {
      total_records = data.length;
      total_pages = Math.ceil(total_records / limit);
      var next = page >= total_pages ? false : true;
      var prev = page <= 1 ? false : true;
      cond.push(start, limit);

      db.query(query + " LIMIT ?, ?", cond, async (err1, data1) => {
        if (err1) {
          return res.json({
            success: false,
            message: "Oops Something went wrong",
            error: err1,
          });
        }
        console.log(query);
        if (data1.length) {
          for (let i = 0; i < data1.length; i++) {
            const e = data1[i];
            var products__attributes = await executeQuery(
              "SELECT products__attributes.*, attributes.* FROM products__attributes LEFT JOIN attributes ON attributes.attribute_id = products__attributes.attribute_id WHERE products__attributes.product_id = ?",
              [e.product_id]
            );
            var products__categories = await executeQuery(
              "SELECT products__categories.*, categories.* FROM products__categories LEFT JOIN categories ON categories.category_id = product_category_id WHERE product_id = 1",
              [e.product_id]
            );
            var products__images = await executeQuery(
              "SELECT * FROM products__images WHERE product_id = ?",
              [e.product_id]
            );
            // var products__pricing = await executeQuery(
            //   "SELECT * FROM products__pricing WHERE product_id = ?",
            //   [e.product_id]
            // );
            var products__variations = await executeQuery(
              "SELECT products__variations.*, variations.*, products__images.*, products__pricing.* FROM products__variations LEFT JOIN variations ON variations.variation_id = products__variations.product_variation_id LEFT JOIN products__images ON products__images.variation_id = products__variations.product_variation_id LEFT JOIN products__pricing ON products__pricing.variation_id = products__variations.product_variation_id WHERE products__variations.product_id = ?",
              [e.product_id]
            );

            data1[i].products__attributes = products__attributes;
            data1[i].products__categories = products__categories;
            data1[i].products__images = products__images;
            // data1[i].products__pricing = products__pricing;
            data1[i].products__variations = products__variations;
          }

          return res.json({
            success: true,
            total_records: total_records,
            total_pages: total_pages,
            page: page,
            next: next,
            prev: prev,
            data: data1,
          });
        } else {
          return res.json({ success: false, message: "data Not Found" });
        }
      });
    }
  });
};
