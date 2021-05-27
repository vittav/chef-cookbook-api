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
        type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
    }
})

// Export Recipe model
let Step = module.exports = mongoose.model('Step', istepSchema)

module.exports.get = function (callback, limit) {
    Step.find(callback).limit(limit)
}