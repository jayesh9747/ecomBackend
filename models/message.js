const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    toUserId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    listingId: {
        type: mongoose.Types.ObjectId,
        ref: "listing",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        default: Date.now
    }

})

const Message = mongoose.model('message',MessageSchema);

module.exports = Message;