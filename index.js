require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const cors = require("cors");

const { connectMongoDB } = require('./connection')
const auth = require('./routes/auth')
const categories = require("./routes/categories");
const user = require('./routes/users')
const listings = require("./routes/listings");
const my = require("./routes/my");
const messages = require("./routes/messages");
const app = express();
const PORT = process.env.PORT || 8001;


//middleware 
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/auth', auth);
app.use("/api/categories", categories);
app.use('/api/user', user);
app.use("/api/listings", listings);
app.use("/api/my", my);
app.use("/api/messages", messages);


app.get('/', async (req, res) => {
    res.json({ msg: "Hello world" })
})



connectMongoDB(process.env.MONGO_URI)
    .then(console.log("MongoDB Database is connected"))
    .catch((err) => {
        console.log("MongoDB err", err);
    })


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})