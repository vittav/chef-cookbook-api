let mongoose = require('mongoose');

// Setup schema
let ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredientQuantity: 
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'IngredientQuantity'
        }
})

// Export Recipe model
let Ingredient = module.exports = mongoose.model('Ingredient', ingredientSchema)

module.exports.get = function (callback, limit) {
    Ingredient.find(callback).limit(limit)
} 