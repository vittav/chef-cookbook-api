let mongoose = require('mongoose');

// Setup schema
let stepSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipe:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'recipes'
    }
})

// Export Recipe model
let Step = module.exports = mongoose.model('steps', stepSchema)

module.exports.get = function (callback, limit) {
    Step.find(callback).limit(limit)
}