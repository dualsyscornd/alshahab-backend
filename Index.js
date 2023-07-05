const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
// --- Body Parser --- \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// --- Body Parser --- \\

const AttributesRouter = require("./Routers/Attributes");
const BrandsRouter = require("./Routers/Brands");
const CategoryRouter = require("./Routers/Cateogy");
const DiscountsRouter = require("./Routers/Discounts");
const Home__slidersRouter = require("./Routers/Home__sliders");
const Products__attributesRouter = require("./Routers/Products__attributes");
const ProductsRouter = require("./Routers/Products");
const CustomerRouter = require("./Routers/CustomerRouter");

if (process.env.ENABLE_CORS) {
  app.use(cors());
}

app.use("/attributes", AttributesRouter);
app.use("/brands", BrandsRouter);
app.use("/category", CategoryRouter);
app.use("/discounts", DiscountsRouter);
app.use("/Home__sliders", Home__slidersRouter);
app.use("/Products__attributes", Products__attributesRouter);
app.use("/Products", ProductsRouter);
app.use("/Customers", CustomerRouter);

app.listen(process.env.PORT, () => {
  console.log(`Al-shahab api listening on port ${process.env.PORT}`);
});
