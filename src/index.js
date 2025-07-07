const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for all origins
app.use(cors());

// ✅ Body parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ MongoDB connection
mongoose
  .connect(
    "mongodb+srv://vevaso4419:wklqDg9qt0BHVZbD@cluster0.jfow2rg.mongodb.net/shyamawebsite",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// ✅ Routes
app.use("/", route);

// ✅ Start server
app.listen(process.env.PORT || 4000, function () {
  console.log("Express app running on port " + (process.env.PORT || 4000));
});
