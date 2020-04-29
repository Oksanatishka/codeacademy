// Create API Router
// 10. Since all routes in this project have paths starting at the /api subpath, we will create an API router
// that will prepend this path segment. Create a directory called api/ in the root directory of the project.
// Within this directory, create a file called api.js.
// 11. Within api.js, importexpress. Then create an instance of an Express router and save it to a variable.
const express = require('express');
const apiRouter = express.Router();
// 19. In api.js, import the artists router and mount it at /artists.
const artistsRouter = require('./artists.js');
const seriesRouter = require('./series.js');

apiRouter.use('/artists', artistsRouter);
apiRouter.use('/series', seriesRouter);

// 12. Export the router.
module.exports = apiRouter;
