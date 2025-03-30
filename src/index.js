const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const { default: mongoose } = require("mongoose");
const { Route } = require("express");
const cors = require("cors");
const app = express();

// Enable All CORS Requests for development use
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(
    "mongodb+srv://qjoxqciedfjvrzyeyh:oVDaqdgLGKDxYT58@cluster0.kczadan.mongodb.net/shyamwebsite",
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



// let express = require('express');
// // let app = express.app();
// // let db = require('../database/db');
// let async = require('async');
// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();
// const CryptoJS = require("crypto-js");

// const session = require('express-session');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: ['https://wabasi.sany.in:5552/', 'http://localhost:3000', 'https://wabasi.sany.in:8991'], // Allow both origins
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use(session({
//   secret: 'secretkey',  // Change this to a strong secret key
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true } // Set true if using HTTPS
// }));

// app.post("/users/insert", jsonParser, async (req, res) => {

//   let username = req.body.username;
//   let password = req.body.password;
//   let name = req.body.name;

//   console.log({ username, password, name });

//   let secretKey = "secretkey1234";

//   // Encrypt password
//   const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
//   console.log({ encryptedPassword });


//   // const decryptedPassword = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
//   // console.log("Decrypted password:", decryptedPassword);


//   let query = "Insert into sany_users(name,email,password) values (?,?,?)";
//   let insertUsers = await db.query(query, [name, username, encryptedPassword]);
//   console.log({ insertUsers });

//   res.send({
//     code: 200,
//     status: "SUCCESS",
//     type: "text",
//     data: "user updated successfully"
//   });
// });

// // app.post("/login", jsonParser, async (req, res) => {
// //     let username = req.body.username;
// //     let password = req.body.password;

// //     console.log({ username, password });

// //     if (!username || !password) {
// //         return res.status(400).send({ message: "username and password is required" });
// //     }
// //     else {
// //         try {
// //             let query = "select * from sany_users where email = ?";
// //             const results = await db.query(query, [username]);
// //             console.log(results[0].length == 0);
// //             if (results[0].length == 0) {
// //                 console.log("inside if block");
// //                 return res.status(401).send({ message: "something went wrong" });
// //             }
// //             // console.log(results[0]);
// //             // if (results.length === 0) {
// //             //     return res.status(401).send("Invalid username and password");
// //             // }

// //             else if (results !== undefined && results[0].length > 0) {
// //                 let ciphertext = results[0][0].password;
// //                 console.log({ ciphertext });

// //                 let secretKey = "secretkey1234";

// //                 const decryptedPassword = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
// //                 console.log("Decrypted password:", decryptedPassword);

// //                 if (password !== decryptedPassword) {
// //                     return res.status(401).send({ message: "Invalid password" });
// //                 }
// //                 else if (password === decryptedPassword) {
// //                     return res.status(200).send({ message: "logged in successfully", token: "token123" });
// //                 }
// //             }

// //         } catch (err) {
// //             console.log(err);
// //         }
// //     }

// // });


// // Update account

// app.put("/users/update", jsonParser, async (req, res) => {
//   let name = req.body.name;
//   let password = req.body.password;
//   let confirmPassword = req.body.confirmPassword;

//   console.log(req.body);

//   if (!name || !password || !confirmPassword) {
//     return res.status(400).send({ message: "All fields are required" });
//   }
//   else if (password !== confirmPassword) {
//     return res.status(400).send({ message: "password and confirm password must be same" });
//   }
//   try {
//     let secretKey = "secretkey1234";

//     // Encrypt password
//     const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
//     console.log({ encryptedPassword });

//     query = "update sany_users set password = ? where name = ?";
//     const results = await db.query(query, [encryptedPassword, name]);
//     console.log(results);
//     return res.status(200).send({ message: "account updated successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ message: "Something went wrong" });
//   }

// });

// const generateCaptcha = () => {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let captcha = '';
//   for (let i = 0; i < 5; i++) {
//     captcha += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return captcha;
// };

// app.get('/captcha', (req, res) => {
//   const captcha = generateCaptcha();
//   req.session.captcha = captcha;
//   res.json({ captcha });
// });

// app.post("/login", jsonParser, async (req, res) => {
//   let { username, password, userCaptcha } = req.body;

//   if (!username || !password || !userCaptcha) {
//     return res.status(400).send({ message: "Username, password, and CAPTCHA are required" });
//   }

//   // Validate CAPTCHA
//   if (!req.session.captcha || userCaptcha !== req.session.captcha) {
//     return res.status(401).send({ message: "Invalid CAPTCHA" });
//   }

//   try {
//     let query = "SELECT * FROM sany_users WHERE email = ?";
//     const results = await db.query(query, [username]);

//     if (results[0].length === 0) {
//       return res.status(401).send({ message: "Invalid username or password" });
//     }

//     let ciphertext = results[0][0].password;
//     let secretKey = "secretkey1234";
//     const decryptedPassword = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);

//     if (password !== decryptedPassword) {
//       return res.status(401).send({ message: "Invalid username or password" });
//     }

//     res.status(200).send({ message: "Logged in successfully", token: "token123" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Something went wrong" });
//   }
// });

// app.listen(process.env.PORT || 5000, function () {
//   console.log("Express app running on port " + (process.env.PORT || 5000));
// });
