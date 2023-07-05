const db = require("../../Config/db");

exports.executeQuery = (query, cond) => {
  return new Promise((resolve, reject) => {
    db.query(query, cond, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
