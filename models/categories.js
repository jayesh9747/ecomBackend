const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique : true,
        required: true,
        trim: true,
    },
    icon:{
        type: String,
        required: true,
        trim: true,
    },
    color:{
        type: String,
        trim: true,
        default:"white",
    },
    backgroundColor:{
        type : String,
        trim: true,
        default: "#ffffff",
    },
    
})

const Categories = mongoose.model('category',CategorySchema);

module.exports = Categories;