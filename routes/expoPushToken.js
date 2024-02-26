const express = require("express");
const router = express.Router();
const Joi = require("joi");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const { schema } = require("../models/categories");
const expoPushToken = require('../controller/expoPushToken.controller');

schema = Joi.object({
    token: Joi.string().required()
})

router.post('/', [auth, validateWith(schema)], expoPushToken);
