// 47. Let’s add our /api/series/:seriesId/issues routes.
// Create issues.js in the api/ directory. In issues.js, create and export an Express router.
// Import the router into series.js and mount it at /:seriesId/issues.
// Since you’ll need to access information about the specified series from the issues router, you’ll need to
// merge parameters. Add the approporiate paramter to your issue router instantiation to enable merging parameters.
const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// 50. Add a route param for :issueId. This param should check to see if an issue with the supplied issue ID
// exists. If so, it should continue to the next middleware function in the middleware stack. If not, it should
// return a 404 response.
issuesRouter.param('issueId', (req, res, next, issueId) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.id = $issueId';
    const values = { $issueId: issueId };
    db.get(sql, values, (error, issue) => {
        if (error) {
            next(error);
        } else if (issue) {
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

// 48. Add a GET handler at / that will retrieve all existing issues of the specified series from the database.
// All errors should be properly handled and successfully retrieved issues should be returned on the issues
// property of the response object with a 200 status code.
// When you think the route is ready, run the testing suite to check your work.
issuesRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.series_id = $seriesId';
    const values = { $seriesId: req.params.seriesId };
    db.all(sql, values, (error, issues) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json({ issues: issues });
        }
    });
});

// 49. Add a POST / route. This route should return a 400 response if any required fields are missing (name,
// issueNumber, publicationDate, or artistId). Additionally, the route should return a 400 response if an artist
// with the provided artist ID does not exist. Otherwise, it should add the new issue to the database and return
// the newly-created series with a 201 status code, handling any errors along the way.
// When you think the route is ready, run the testing suite to check your work.
issuesRouter.post('/', (req, res, next) => {
    const name = req.body.issue.name,
        issueNumber = req.body.issue.issueNumber,
        publicationDate = req.body.issue.publicationDate,
        artistId = req.body.issue.artistId;
    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = { $artistId: artistId };
    db.get(artistSql, artistValues, (error, artist) => {
        if (error) {
            next(error);
        } else {
            if (!name || !issueNumber || !publicationDate || !artist) {
                return res.sendStatus(400);
            }

            const sql =
                'INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id)' +
                'VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)';
            const values = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $seriesId: req.params.seriesId
            };

            db.run(sql, values, function(error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`,
                        (error, issue) => {
                            res.status(201).json({ issue: issue });
                        }
                    );
                }
            });
        }
    });
});

// 51. Add a PUT /:issueId route. This route should return a 400 response if any required fields are missing
// (name, issueNumber, publicationDate, or artistId). Additionally, the route should return a 400 response if an
// artist with the provided artist ID does not exist. Otherwise, it should update the issue in the database and
// return the newly-updated series with a 200 status code, handling any errors along the way.
// When you think the route is ready, run the testing suite to check your work.
issuesRouter.put('/:issueId', (req, res, next) => {
    const name = req.body.issue.name,
        issueNumber = req.body.issue.issueNumber,
        publicationDate = req.body.issue.publicationDate,
        artistId = req.body.issue.artistId;
    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = { $artistId: artistId };
    db.get(artistSql, artistValues, (error, artist) => {
        if (error) {
            next(error);
        } else {
            if (!name || !issueNumber || !publicationDate || !artist) {
                return res.sendStatus(400);
            }

            const sql =
                'UPDATE Issue SET name = $name, issue_number = $issueNumber, ' +
                'publication_date = $publicationDate, artist_id = $artistId ' +
                'WHERE Issue.id = $issueId';
            const values = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $issueId: req.params.issueId
            };

            db.run(sql, values, function(error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Issue WHERE Issue.id = ${req.params.issueId}`,
                        (error, issue) => {
                            res.status(200).json({ issue: issue });
                        }
                    );
                }
            });
        }
    });
});
// 52. Add a DELETE /:issueId route. This route should delete issue with the specified issue ID from the database.
// The route should handle any errors and send a 204 response upon successful deletion.
// When you think the route is ready, run the testing suite to check your work.

// Seed Database
// 54. At this point, your API should be complete and X-Press Publishing should work as expected! Run your
// testing suite (everything should pass) and try out all of the functionality on the site. If at any point you
// need to create more data, you can run our seed file to add some fake data to your database. To do this, run
// node seed.js from the root directory of the project.
// Congratulations, you created a complete API for a fully-operational internal tool. This is an awesome
// achievement!
issuesRouter.delete('/:issueId', (req, res, next) => {
    const sql = 'DELETE FROM Issue WHERE Issue.id = $issueId';
    const values = { $issueId: req.params.issueId };

    db.run(sql, values, error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = issuesRouter;
