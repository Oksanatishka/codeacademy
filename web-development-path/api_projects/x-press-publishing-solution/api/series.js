// Create Series Routes
// 38. Let’s add our /api/series routes.
// Create series.js in the api/ directory. In series.js, create and export an Express router.
// Import the router into api.js and mount it at /series.

const express = require('express');
const seriesRouter = express.Router();
// 39. In series.js, open a sqlite3database to your database or the provided test database.
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const issuesRouter = require('./issues.js');

// 41. Add a router param for handling the seriesId parameter. This router param should retrieve the
// specified series from the database and attach it as series on the request object. If a series with that ID
// does not exist, a 404 response should be sent.
// When you think the route is ready, run the testing suite to check your work.
seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    const sql = 'SELECT * FROM Series WHERE Series.id = $seriesId';
    const values = { $seriesId: seriesId };
    db.get(sql, values, (error, series) => {
        if (error) {
            next(error);
        } else if (series) {
            req.series = series;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});
// 47.
seriesRouter.use('/:seriesId/issues', issuesRouter);

// 40. Add a GET handler at / that will retrieve all existing series from the database.
// All errors should be properly handled and successfully retrieved series should be returned on the series
// property of the response object with a 200 status code.
// When you think the route is ready, run the testing suite to check your work.
seriesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Series', (err, series) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ series: series });
        }
    });
});
// 42. Add a GET /:seriesId route. This route should return the retrieved series on the request object
// with a 200 status code.
// When you think the route is ready, run the testing suite to check your work.
seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({ series: req.series });
});

// 43. Add a POST / route. This route should return a 400 response if any required fields are missing (name or
// description). Otherwise, it should add the new series to the database and return the newly-created series
// with a 201 status code, handling any errors along the way.
// When you think the route is ready, run the testing suite to check your work.
seriesRouter.post('/', (req, res, next) => {
    const name = req.body.series.name,
        description = req.body.series.description;
    if (!name || !description) {
        return res.sendStatus(400);
    }

    const sql = 'INSERT INTO Series (name, description) VALUES ($name, $description)';
    const values = {
        $name: name,
        $description: description
    };

    db.run(sql, values, function(error) {
        if (error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, (error, series) => {
                res.status(201).json({ series: series });
            });
        }
    });
});

// 44. Add a PUT /:seriesId route. This route should return a 400 response if any required fields are missing
// (name or description). Otherwise, it should add the new series to the database and return the newly-updated
// series with a 200 status code, handling any errors along the way.
// When you think the route is ready, run the testing suite to check your work.
// We will wait to write the DELETE /:seriesId route until we’ve added issues, as checking for whether or not
// a series has issue prior to deletion is a large part of the logic.
// At this point when you load the X-Press Publishing app, a list of all saved series should load on the landing
// page. Clicking one of them should allow you to view and update that series. You should additionally be able
// to create new series by clicking the ‘New Series’ button on the landing page.
seriesRouter.put('/:seriesId', (req, res, next) => {
    const name = req.body.series.name,
        description = req.body.series.description;
    if (!name || !description) {
        return res.sendStatus(400);
    }

    const sql =
        'UPDATE Series SET name = $name, description = $description ' +
        'WHERE Series.id = $seriesId';
    const values = {
        $name: name,
        $description: description,
        $seriesId: req.params.seriesId
    };

    db.run(sql, values, error => {
        if (error) {
            next(error);
        } else {
            db.get(
                `SELECT * FROM Series WHERE Series.id = ${req.params.seriesId}`,
                (error, series) => {
                    res.status(200).json({ series: series });
                }
            );
        }
    });
});

seriesRouter.delete('/:seriesId', (req, res, next) => {
    const issueSql = 'SELECT * FROM Issue WHERE Issue.series_id = $seriesId';
    const issueValues = { $seriesId: req.params.seriesId };
    db.get(issueSql, issueValues, (error, issue) => {
        if (error) {
            next(error);
        } else if (issue) {
            res.sendStatus(400);
        } else {
            const deleteSql = 'DELETE FROM Series WHERE Series.id = $seriesId';
            const deleteValues = { $seriesId: req.params.seriesId };

            db.run(deleteSql, deleteValues, error => {
                if (error) {
                    next(error);
                } else {
                    res.sendStatus(204);
                }
            });
        }
    });
});

module.exports = seriesRouter;
