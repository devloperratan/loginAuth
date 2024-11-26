const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    phone: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
})


module.exports = mongoose.model('User', userSchema)