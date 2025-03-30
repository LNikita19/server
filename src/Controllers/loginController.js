const loginModel = require("../Models/loginModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    let data = req.body;

    const { Email, Password } = data;

    if (!Email || !Password) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    data.Password = hashedPassword;
    const newUser = new loginModel(data);
    await newUser.save();

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const userLogin = async (req, res) => {
  try {
    let body = req.body;
    if (Object.keys(body).length > 0) {
      let userName = req.body.Email;
      let Password = req.body.Password;

      let user = await loginModel.findOne({ Email: userName });

      if (!user) {
        return res.status(400).send({
          status: false,
          msg: "credintials is not correct",
        });
      }

      //Compare hashed Password using bcrypt
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ status: false, msg: "credintials is not correct" });
      }

      let token = jwt.sign(
        {
          userId: user._id,
        },
        "chessBoard",
        { expiresIn: "12hrs" }
      );
      //console.log(req.session);

      res.status(200).setHeader("x-api-key", token);
      return res.status(201).send({ status: "loggedin", token: token });
    } else {
      return res.status(400).send({ msg: "Bad Request" });
    }
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};
const getusersData = async (req, res) => {
  try {
    const Data = await loginModel.find();
    res.status(200).send({
      status: true,
      msg: "Data retrieved succesfully",
      data: Data,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeleteUser = async (req, res) => {
  try {
    const result = await loginModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} programdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  getusersData,
  DeleteUser,
};
