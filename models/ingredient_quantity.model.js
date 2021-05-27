let mongoose = require('mongoose');

// Setup schema
let ingredientQuantitySchema = mongoose.Schema({
    quantity: {
        type: String,
        required: true
    },
    ingredient:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'
    },
    recipe:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
    }
})

// Export Recipe model
let IngredientQuantity = module.exports = mongoose.model('IngredientQuantity', ingredientQuantitySchema)

module.exports.get = function (callback, limit) {
    IngredientQuantity.find(callback).limit(limit)
}