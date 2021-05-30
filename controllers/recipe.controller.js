// Import recipe model
const Recipe = require('../models/recipe.model')

// Handle index actions
exports.index = function (req, res) {
    Recipe.find().exec(function (err, recipes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Recipes retrieved successfully",
            data: recipes
        });
    });
}

// Handle view recipe info
exports.view = function (req, res) {
    Recipe.findById(req.params.crecipe_id, function (err, recipe) {
        if (err)
            res.send(err);
        res.json({
            message: 'Recipe details loading..',
            data: recipe
        });
    });
}
