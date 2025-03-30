const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const {
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
} = require("../Controllers/homeController");

const {
  aboutData,
  getaboutData,
  getBaboutyId,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
} = require("../Controllers/aboutController");


const {
  programData,
  getprogramData,
  getBprogramyId,
  updateprogramData,
  Deleteprogramdata,
  DeleteprogramById,
} = require("../Controllers/programController");


const {
  authorData,
  getauthorData,
  getauthorById,
  updateAuthorData,
  DeleteAuthordata,
  DeleteAuthorById,
} = require('../Controllers/AuthorController');


const { footerData,
  getfooterData,
  getfooterById,
  updatefooterData,
  Deletefooterdata,
  DeleteBfooteryId, } = require("../Controllers/footerController");
//user
const {
  createUser,
  userLogin,
  getusersData,
  DeleteUser,
} = require("../Controllers/loginController");

const { onlineclassData,
  getonlineData,
  getonlineById,
  updateOnlineData,
  DeleteOnlinedata,
  DeleteonlineById } = require('../Controllers/onlineClassController');


const {
  userContactData,
  getuserContactData,
  updateuserContactData,
  DeleteuserContactdata,
} = require("../Controllers/usercontactController");

router.post("/userContactData", userContactData);
router.get("/getuserContactData", getuserContactData);
router.put("/updateuserContactData/:userContactId", updateuserContactData);
router.delete("/DeleteuserContactdata", DeleteuserContactdata);



const TestimonialController = require("../Controllers/TestimonialController");
const uploadiamgecontroller = require('../Controllers/uploadimageController');
const comboController = require("../Controllers/combocontroller");
const existingController = require("../Controllers/ExistingController");




router.post("/createExistingProgram", upload.single("Photo"), existingController.existingData);
router.get("/getExistingPrograms", existingController.getexistingData);
router.get("/getExistingProgramById/:existingId", existingController.getexistingId);
router.put("/updateExistingProgram/:existingId", upload.single("Photo"), existingController.updateexistData);
router.delete("/deleteExistingProgram/:existingId", existingController.DeleteexistById);
router.delete("/deleteExistingProgram", existingController.Deleteexistdata);

//combo
router.post("/createComboProgram", upload.single("Photo"), comboController.createComboProgram);
router.get("/getComboPrograms", comboController.getComboPrograms);
router.get("/getComboProgramById/:comboId", comboController.getComboProgramById);
router.put("/updateComboProgram/:comboId", upload.single("Photo"), comboController.updateComboProgram);
router.delete("/deleteComboProgram/:comboId", comboController.deleteComboProgramById);
router.delete("/deleteComboProgram", comboController.deleteComboProgram);
// Testimonial routes
router.post("/createtestimonial", upload.single("Photo"), TestimonialController.createTestimonial);
router.put("/updatetestimonialdata/:testimonialId", upload.single("Photo"), TestimonialController.updateTestimonialData);
router.get("/gettestimonialdata", TestimonialController.getTestimonialData);
router.get("/gettestimonialdatabyid/:testimonialId", TestimonialController.getTestimonialDataById);
router.delete("/deletetestimonialdata", TestimonialController.deleteTestimonialData);
router.delete("/deletetestimonialdatabyid/:testimonialId", TestimonialController.deleteTestimonialDataById);




router.post("/uploadImageData", upload.single("Photo"), uploadiamgecontroller.uploadImageData);
router.put("/updateImageDataData/:uploadImageId", upload.single("Photo"), uploadiamgecontroller.updateImageDataData);
router.get("/getImageDataData", uploadiamgecontroller.getImageDataData);
// router.get("/getTestimonialDataById/:uploadImageId", uploadiamgecontroller.getTestimonialDataById);
router.delete("/DeleteImageDatadata", uploadiamgecontroller.DeleteImageDatadata);
router.delete("/DeleteByImageDataId/:uploadImageId", uploadiamgecontroller.DeleteByImageDataId);

//Home//
router.post("/createData", upload.single("Photo"), homeData);
router.get("/getData", getData);
router.get("/getById/:homeId", getById);
router.put("/updateData/:homeId", upload.single("Photo"), updateData);
router.delete("/deleteData", Deletedata);
router.delete("/deleteId/:homeId", DeleteById);

//about
const path = require('path');
const fs = require('fs');
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure "uploads/" exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload1 = multer({
  storage1: storage1,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).array("Photos", 5);
router.post('/createaboutData', upload1, aboutData);
router.put('/updateaboutData/:aboutId', upload1, updateaboutData);
// router.post("/createaboutData", upload.single("Photo"), aboutData);
router.get("/getaboutData", getaboutData);
router.get("/getaboutById/:aboutId", getBaboutyId);



// router.put("/updateaboutData/:aboutId", upload.single("Photo"), updateaboutData);
router.delete("/deleteaboutData", Deleteaboutdata);
router.delete("/deleteaboutId/:aboutId", DeleteaboutById);


//author
router.post("/authorData", upload.single("Photo"), authorData);
router.get("/getauthorData", getauthorData);
router.get("/getauthorById/:authorId", getauthorById);
router.put("/updateauthorData/:authorId", upload.single("Photo"), updateAuthorData);
router.delete("/deleteauthorData", DeleteAuthordata);
router.delete("/deleteauthorId/:authorId", DeleteAuthorById);



//onlineclass


router.post("/onlineclassData", upload.single("Photo"), onlineclassData);
router.get("/getonlineData", getonlineData);
router.get("/getonlineById/:onlineclassId", getonlineById);
router.put("/updateOnlineData/:onlineclassId", upload.single("Photo"), updateOnlineData);
router.delete("/DeleteOnlinedata", DeleteOnlinedata);
router.delete("/DeleteonlineById/:onlineclassId", DeleteonlineById);




//program 

router.post("/programData", upload.single("Photo"), programData);
router.get("/getprogramData", getprogramData);
router.get("/getprogramById/:programId", getBprogramyId);
router.put("/updateprogramData/:programId", upload.single("Photo"), updateprogramData);
router.delete("/Deleteprogramdata", Deleteprogramdata);
router.delete("/DeleteprogramById/:programId", DeleteprogramById);


//footer
router.post("/footerData", upload.single("Photo"), footerData);
router.get("/getfooterData", getfooterData);
router.get("/getfooterById/:footerId", getfooterById);
router.put("/updatefooterData/:footerId", upload.single("Photo"), updatefooterData);
router.delete("/Deletefooterdata", Deletefooterdata);
router.delete("/DeleteBfooteryId/:footerId", DeleteBfooteryId);

//user Login
router.post("/createUser", createUser);
router.post("/userLogin", userLogin);
router.get("/getusersData", getusersData);
router.delete("/DeleteUser", DeleteUser);

module.exports = router;
