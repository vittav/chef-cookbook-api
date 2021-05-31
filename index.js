// Imports

// Import express
let express = require('express')
let cors = require('cors');
const bodyParser = require('body-parser')
// Import Mongoose
require('mongoose');
// Import routes
let apiRoutes = require("./routes/api-routes");
// Import and initialize db
require("./db");



//  ------------------------------------------------

// Initializing

// Initialize the app
let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
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
