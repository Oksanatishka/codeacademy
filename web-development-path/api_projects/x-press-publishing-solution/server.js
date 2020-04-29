// Setup Project
// 1. Download and unzip the skeleton code for this project here.
// 2. Navigate to the root directory using a terminal and run npm install.
// Setup Server
// 3. In the project’s root directory, create a file named server.js.
// 4. Install and import the following packages: body-parser, cors, errorhandler, morgan, and express.
// When installing, ensure they get saved to the dependencies in package.json.

const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
// 13. In server.js, import the API router and mount it at all routes starting at /api.
const apiRouter = require('./api/api');
// 5. Create an instance of an Express app and save it to a variable.
const app = express();
// 6. Create a variable representing the port your server will listen on. This should be able to be optionally
// set to process.env.PORT if that value is set, for testing purposes. Otherwise, it should default to the port
// number of your choice (except 8081 as this is the port the test file uses).
const PORT = process.env.PORT || 4000;

// 7. Use the body-parser JSON, errorhandler, and CORS middleware functions for all routes in the server.
// Additionally consider setting up morgan logging to the dev setting for easier debugging.
app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRouter);

app.use(errorhandler());

// 8.Start your server using the port variable you declared earlier. Add a callback function that will log out
// a useful message to the console once your server is running.
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});

// 9. Finally, export the Express app (for use in the test file).
module.exports = app;
