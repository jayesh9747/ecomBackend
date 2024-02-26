const express = require("express");
const router = express.Router();
const { errorFunction } = require('../utils/errorFunction');

const Listing = require('../models/listings');



const auth = require("../middleware/auth");

router.get("/listings", auth, async (req, res) => {
    try {
        const listings = await Listing.find({ userId: req.user._id })
            .populate('CategoryId')
            .exec();
      
        res.json( listings );
    } catch (error) {
        console.log(error);
        return res.json(errorFunction(true, `Error : ${error}`));
    }


});

module.exports = router;