const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const mongoose = require('mongoose');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const Category = require('../models/categories')
const Listing = require('../models/listings')
const { errorFunction } = require('../utils/errorFunction');
const config = require('../config/firebase.config')
const objectId = require('../middleware/checkObjectId');

//Initialize a firebase application
initializeApp(config.firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const FireStorage = getStorage();




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = req.user._id + "_" + Date.now();
    return cb(null, uniquePrefix + "_" + file.originalname);
  }
})

const upload = multer({
  storage: multer.memoryStorage(),
});

const Schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: objectId.required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
});

const validateCategoryId = async (req, res, next) => {
  const categories = Category.findById({ _id: req.body._id });
  if (!categories) {
    res.status(404);
    return res.json(errorFunction(true, "Category doesn't exits"));
  }
  next();
};

const maxCount = 5;


router.get('/',async(req,res)=>{
  try {
    const listing = Listing.find({})
    .populate('CategoryId')
    .exec();
    res.json(listing);
  } catch (error) {
    res.status(404);
    return res.json(errorFunction(true, "there is no such a list"));
  }
})


router.post('/', [
  auth,
  upload.array("images", maxCount),
  validateWith(Schema),
  validateCategoryId,
  // imageResize,
], async (req, res) => {
 

  let filesData = [];

  for (const file of req.files) {

    const uniquePrefix = req.user._id + "_" + Date.now();
    const filename=  uniquePrefix + "_" + file.originalname;

    const storageRef = ref(FireStorage, filename);
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    filesData.push({
      url: downloadURL
    });
  }
 

  try {
    const listing = await Listing.create({
      title: req.body.title,
      price: parseFloat(req.body.price),
      CategoryId: req.body.categoryId,
      description: req.body.description,
      location: req.body.location,
      userId: req.user._id,
      images:filesData
    })

    res.status(201).send(listing);

  } catch (error) {
    console.log(error);
    res.status(501);
    return res.json(errorFunction(true, `error : ${error.message}`));

  }


});






module.exports = router;


