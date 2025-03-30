const userContactModel = require("../Models/usercontactModel");
const nodemailer = require("nodemailer");


const userContactData = async (req, res) => {
  try {
    const { Name, Phone, Email, Message, LastName } = req.body;

    // ✅ Save to Database
    const newContact = new userContactModel({
      Name,
      LastName,
      Phone,
      Email,
      Message,

    });
    await newContact.save();

    // ✅ Email Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nikitalilhore123@gmail.com",
        pass: "dzjfxzvmwndjwmme",
      },
    });

    const mailOptions = {
      from: "nikitalilhore@gmail.com",
      to: "nikitalilhore123@gmail.com", // ✅ Owner Email
      subject: "New Contact Form Submission",
      text: `
        Name: ${Name}
        LastName: ${LastName}
        Phone: ${Phone}
        Email: ${Email}
        Message: ${Message}
        
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).json({ status: false, msg: "Email not sent!" });
      }
      console.log("Email sent: " + info.response);
      return res.status(201).json({ status: true, msg: "Message sent!", data: newContact });
    });

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ status: false, msg: "Server error", error: err.message });
  }
};

const getuserContactData = async (req, res) => {
  try {
    const userContactData = await userContactModel.findOne({
      isDeleted: false,
    });
    res.status(200).send({
      status: true,
      msg: "userContactData retrieved succesfully",
      data: userContactData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserContactData = async (req, res) => {
  try {
    const { Name, Phone, Email, LastName, Message } = req.body;
    const userContactId = req.params.userContactId;

    const UpdateuserContact = await userContactModel.findByIdAndUpdate(
      userContactId,
      { $set: { Name, Phone, Email, LastName, Message } },
      { new: true }
    );

    // console.log("Update result:", UpdateuserContact);

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateuserContact,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteuserContactdata = async (req, res) => {
  try {
    const result = await userContactModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userContactdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userContactData,
  getuserContactData,
  updateuserContactData,
  DeleteuserContactdata,
};
