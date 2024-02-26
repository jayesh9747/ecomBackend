const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { getUser } = require('../controller/user.controller');
const validateWith = require('../middleware/validation')

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
});


router.post('/', validateWith(schema), getUser)

module.exports = router;
