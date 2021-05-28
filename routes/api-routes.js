// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Hello world with Express and Nodemon'
    });
});

// Import contact controller
let recipeController = require('../controllers/recipe.controller');
let userController = require('../controllers/user.controller');

// Contact routes
router.route('/recipes')
    .get(recipeController.index)

router.route('/recipes/:recipe_id')
    .get(recipeController.view)

router.route('/users')
    .get(userController.index)
    
// Export API routes
module.exports = router;