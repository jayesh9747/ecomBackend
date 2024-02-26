const express = require("express");
const router = express.Router();
const Joi = require("joi");

const objectId = require('../middleware/checkObjectId');
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const { GetMessages, PostMessages } = require('../controller/message.controller');


const schema = Joi.object({
    listingId: objectId.required(),
    message: Joi.string().required(),
});


router.get('/',auth ,GetMessages);

router.post('/',[auth,validateWith(schema)],PostMessages);

module.exports = router;