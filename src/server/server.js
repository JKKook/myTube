// initial settings
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect Mongoose
mongoose
    .connect(process.env.MONGO_ATLAS_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('monogoose connect..');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});
