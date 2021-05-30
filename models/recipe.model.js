let mongoose = require('mongoose');

// Setup schema
let recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Ingredient'
        }
    ],
    steps: [
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Step'
        }
    ]
})

// Export Recipe model
module.exports = mongoose.model('recipes', recipeSchema)

module.exports.get = function(callback, limit) {
    Recipe.find(callback).limit(limit)
}