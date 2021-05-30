let mongoose = require('mongoose');

// Setup schema
let ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    recipe:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
    }
})

// Export Recipe model
let Ingredient = module.exports = mongoose.model('ingredients', ingredientSchema)

module.exports.get = function (callback, limit) {
    Ingredient.find(callback).limit(limit)
} 