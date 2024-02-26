const express = require('express');
const router = express.Router();
const joi = require('joi');

const { addUser } = require('../controller/user.controller')
const validateWith = require('../middleware/validation')

const Schema = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
})


router.post('/', validateWith(Schema), addUser);


module.exports = router;