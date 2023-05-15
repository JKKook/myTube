const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    // _id : objectId
    email: { type: String, trim: true, require: true },
    password: { type: String, trim: true, require: true },
    entryDate: { type: Date, default: Date.now },
});

// modeling
const Logins = mongoose.model('logins', loginSchema);

// model exports
const loginSchemas = { Logins: Logins };

module.exports = loginSchemas;
