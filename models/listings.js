const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
    },
    images: [{
        url: String,
        thumbnailUrl: String
    }],
    price: {
        type: Number,
        required : true,
    },
    CategoryId : {
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: true,
    },
    userId :  {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    location: {
        latitude: Number,
        longitude: Number
    }
})

const Listing = mongoose.model('listing', ListingSchema);

module.exports = Listing;