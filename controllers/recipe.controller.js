// Import recipe model
const { query } = require('express');
const Recipe = require('../models/recipe.model');
const Ingredients = require('../models/ingredient.model');
const Steps = require('../models/step.model');

// Handle index actions
exports.index = function (req, res) {
    let query = Recipe.find();
    query.populate({ path: 'ingredients', model: Ingredients });
    query.populate({ path: 'steps', model: Steps });
    query.exec(function (err, recipes) {
        if (err) {
            console.log(err)
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
    let query = Recipe.find({ _id: req.params.recipe_id });
    query.populate({path: 'ingredients', model: Ingredients});
    query.populate({path: 'steps', model: Steps});
    query.exec(function (err, recipe){
        if (err) {
            console.log(err)
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Recipes retrieved successfully",
            data: recipe
        });
    })
}



    // Recipe.findOne({ _id: req.params.recipe_id }).populate({ path: 'ingredients' }).exec(function (err, recipe) {
    //     if (err) throw err;
    //     res.json({
    //         message: 'Recipe details loading..',
    //         data: recipe
    //     });
    // });

