// Imports

// Import express
let express = require('express')
// Import Mongoose
let mongoose = require('mongoose');
// Import routes
let apiRoutes = require("./routes/api-routes");
// Import and initialize db
let db = require("./db");

//  ------------------------------------------------

// Initializing

// Initialize the app
let app = express();

// Use Api routes in the App
app.use('/api', apiRoutes)

//  ------------------------------------------------

// Configuration

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Setup server port
let port = process.env.PORT || 8080;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
