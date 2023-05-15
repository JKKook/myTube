const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    // _id : objectId
    nickName: { type: String, maxlength: 20 },
    email: { type: String, trim: true, require: true, unique: 1 },
    password: { type: String, trim: true, minlength: 5, require: true },
    token: { type: String },
    entryDate: { type: Date, default: Date.now },
});

// modeling
const Logins = mongoose.model('logins', loginSchema);

// model exports
const loginSchemas = { Logins: Logins };

module.exports = loginSchemas;
