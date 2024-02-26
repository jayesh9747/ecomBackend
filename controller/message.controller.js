const Joi = require("joi");
const { Expo } = require("expo-server-sdk");

const Message = require('../models/message');
const { errorFunction } = require('../utils/errorFunction');
const Listing = require("../models/listings");
const User = require("../models/user");
const sendPushNotification = require("../utils/pushNotification");

const GetMessages = async (req, res) => {

    const messages = await Message.find({ toUserId: req.user._id })
        .populate('toUserId')
        .populate('fromUserId')
        .exec();

    res.send(messages);
    console.log(messages);

}

const PostMessages = async (req, res) => {

    console.log(req.body);
    try {
        
    const { listingId, message } = req.body;

    console.log(listingId,message);
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(400).json(errorFunction(true, `Invalid ListingId.`));

    const targetUser = User.findById(listing.userId);
    if (!targetUser) return res.status(400).json(errorFunction(true, `Invalid userId.`));

    const messages = await Message.create({
        fromUserId: req.user._id,
        toUserId: listing.userId,
        content: message,
        listingId: listingId
    })
    
    const {expoPushToken} = targetUser;

    if(Expo.isExpoPushToken(expoPushToken))
        await sendPushNotification(expoPushToken,message);

        res.status(201).send("msg send successfully");

    } catch (error) {
        res.status(501);
        return res.json(errorFunction(true, `Error: ${error}`));
    }

}


module.exports = {
    GetMessages,
    PostMessages
}