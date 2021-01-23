// DEPENDENCIES
const express = require("express");
const path = require("path");


// EXPRESS CONFIGURATION
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serving static files in Express, so it will load the files that are in the public directory
app.use(express.static(path.join(__dirname, "public"))) 

// ROUTER
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// LISTENER
app.listen(PORT, function() {
  console.log("App listening on PORT: http://127.0.0.1:" + PORT);
});