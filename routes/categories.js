const express = require("express");
const router = express.Router();

const Categories = require('../models/categories')

router.get("/", async(req, res) => {
    console.log(req.user);
    const categories = await Categories.find({});
    console.log(categories);
    return res.send(categories);
});


module.exports = router;