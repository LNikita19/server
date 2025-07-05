const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const { default: mongoose } = require("mongoose");
const { Route } = require("express");
const cors = require("cors");
const app = express();

// Enable All CORS Requests for development use
const allowedOrigins = [
  "https://shyama-yoga.com",
  "https://adminside.shyama-yoga.com",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:3002",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if using cookies/auth
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
); app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(
    "mongodb+srv://vevaso4419:wklqDg9qt0BHVZbD@cluster0.jfow2rg.mongodb.net/shyamawebsite",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 4000, function () {
  console.log("Express app running on port " + (process.env.PORT || 4000));
});


