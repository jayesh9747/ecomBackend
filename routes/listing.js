const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Listing = require('../models/listings');
const {errorFunction} = require('../utils/errorFunction');

router.get("/:id", auth, async (req, res) => {

    const listing = await Listing.find({_id:req.params.id});
    if (!listing) {
        res.status(404);
        return res.json(errorFunction(true, "there is no such a list"));
    }
});

module.exports = router;
