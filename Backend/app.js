const express = require("express");
const app = express();

const ErrorHandler = require('./utlis/errorHandler'); // Use the correct relative path


const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use("/", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/.env" });
}

const user = require("./controller/user");
app.use("/api/v2/user", user);
const product = require("./controller/product");
app.use("/api/v2/product", product);
// Middleware for Errors
app.use(ErrorHandler);

module.exports = app;