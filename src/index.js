// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const route = require("./Route/route");
// // const { default: mongoose } = require("mongoose");
// // const { Route } = require("express");
// // const cors = require("cors");
// // const app = express();

// // // Enable All CORS Requests for development use
// // const allowedOrigins = [
// //   "https://shyama-yoga.com",
// //   "https://adminside.shyama-yoga.com",
// //   "https://server-six-beryl.vercel.app/",
// //   "http://localhost:3001",
// //   "http://localhost:4000",
// //   "http://localhost:3002",
// //   "http://localhost:3000",
// //   "https://server-9ao7.vercel.app",
// //   "https://user-xi-silk.vercel.app/",
// //   "https://admin-steel-phi.vercel.app/"
// // ];

// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin || allowedOrigins.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true, // if using cookies/auth
// //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// //   })
// // ); app.use(bodyParser.json({ limit: "50mb" }));
// // app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// // mongoose
// //   .connect(
// //     "mongodb+srv://vevaso4419:wklqDg9qt0BHVZbD@cluster0.jfow2rg.mongodb.net/shyamawebsite",
// //     {
// //       useNewUrlParser: true,
// //     }
// //   )
// //   .then(() => console.log("MongoDb is connected"))
// //   .catch((err) => console.log(err));

// // app.use("/", route);

// // app.listen(process.env.PORT || 4000, function () {
// //   console.log("Express app running on port " + (process.env.PORT || 4000));
// // });





// const express = require("express");
// const bodyParser = require("body-parser");
// const route = require("./Route/route");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// const allowedOrigins = [
//   "https://shyama-yoga.com",
//   "https://adminside.shyama-yoga.com",
//   "https://server-six-beryl.vercel.app",
//   "http://localhost:3001",
//   "http://localhost:4000",
//   "http://localhost:3002",
//   "http://localhost:3000",
//   "https://server-9ao7.vercel.app",
//   "https://user-xi-silk.vercel.app",
//   "https://admin-steel-phi.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );

// // ✅ Body parsers
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// // ✅ MongoDB connection
// mongoose
//   .connect(
//     "mongodb+srv://vevaso4419:wklqDg9qt0BHVZbD@cluster0.jfow2rg.mongodb.net/shyamawebsite",
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => console.log("MongoDB is connected"))
//   .catch((err) => console.log(err));

// // ✅ API routes
// app.use("/", route);

// // ✅ Server startup
// app.listen(process.env.PORT || 4000, function () {
//   console.log("Express app running on port " + (process.env.PORT || 4000));
// });


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./Route/route");

const app = express();

// ✅ Manual CORS handling for Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://shyama-yoga.com",
    "https://adminside.shyama-yoga.com",
    "https://server-9ao7.vercel.app",
    "https://server-six-beryl.vercel.app",
    "https://admin-steel-phi.vercel.app",
    "https://user-xi-silk.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:4000"
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Body parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ Connect MongoDB
mongoose
  .connect(
    "mongodb+srv://vevaso4419:wklqDg9qt0BHVZbD@cluster0.jfow2rg.mongodb.net/shyamawebsite",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Use routes
app.use("/", route);

// ✅ Start server
app.listen(process.env.PORT || 4000, () => {
  console.log("Express app running on port " + (process.env.PORT || 4000));
});
