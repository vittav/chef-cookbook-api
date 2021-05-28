let mongoose = require('mongoose');

// Setup schema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Export user model
let User = module.exports = mongoose.model('users', userSchema)

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}