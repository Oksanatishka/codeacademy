// 18. Now, let’s write the CRUD operations for /api/artists.
// Start by creating a file in the api/ directory called artists.js. Within artists.js, import express,
// create an Express router, and export the Express router.
const express = require('express');
const artistsRouter = express.Router();

// 20. Back in artists.js, import sqlite3 and open an instance of database.sqlite. When loading the database,
// check if process.env.TEST_DATABASE has been set, and if so load that database instead. This will allow the
// testing suite to check your routes without corrupting your database.
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// 24. Our GET, PUT, and DELETE route paths will have an :artistId parameter. For both, we will have to check
// that an artist with that ID exists and if not send a 404 response. Let’s add a router param to reduce
// boilerplate code. Add a router param of artistId to the router.
artistsRouter.param('artistId', (req, res, next, artistId) => {
    // 25. Within the artist param callback, execute a SQL query which will get the artist with the given ID.
    const sql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const values = { $artistId: artistId };
    db.get(sql, values, (error, artist) => {
        // 26. Within the callback function of the sqlite3 query, send any SQL errors down the middleware chain.
        // Otherwise, check if an artist was retrieved. If so, attach it to the request object as artist and
        // move to the next function in the middleware chain. If not, send a 404 response.
        if (error) {
            next(error);
        } else if (artist) {
            req.artist = artist;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

// 21. Add a GET handler to the router for the / path (remember this router is already mounted at /api/artists
// so there is no need to add all of that boilerplate).
artistsRouter.get('/', (req, res, next) => {
    // 22. Within the GET / handler, execute a sqlite3 query that will retrieve all entries in the Artist table
    // where is_currently_employed is equal to 1. This will retrieve all currently-employed artists.
    db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1', (err, artists) => {
        // 23.Within the callback of this query, check if there is an error. If so, pass it along the middleware
        // chain to be dealt with by errorhandler.
        // Otherwise, send a response containing a JSON body with a key of artists and a value of the retrieved
        // artists, along with a status code of 200.
        // When you think your /api/artists GET route is ready, run the testing suite to check your work.
        if (err) {
            next(err);
        } else {
            res.status(200).json({ artists: artists });
        }
    });
});

// 27. Now we’re ready to write our GET /api/artist/:artistId handler.
// Register another GET handler at the above path segment. Our router param should already handle all of the
// necessary SQL and error-handling logic and attach the retrieved artist at req.artist.
// Within the handler’s callback function, return a 200 response with a JSON body containing a key of artist
// and a value of the retrieved artist.
// When you think your /api/artists/:artistId GET route is ready, run the testing suite to check your work.
artistsRouter.get('/:artistId', (req, res, next) => {
    res.status(200).json({ artist: req.artist });
});

// 28. Add a POST handler at the / path segment. Within the callback function of this handler, check that all
// required fields are present on the artist object of the request body (name, dateOfBirth, and biography).
// If not, send a 400 response.
// 29. Additionally check to see if is_currently_employed was set on the request’s artist object.
// If not, set it to 1. This will simplify our SQL logic in the next step.
artistsRouter.post('/', (req, res, next) => {
    const name = req.body.artist.name,
        dateOfBirth = req.body.artist.dateOfBirth,
        biography = req.body.artist.biography,
        isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;
    if (!name || !dateOfBirth || !biography) {
        return res.sendStatus(400);
    }
    // 30. Next, execute a SQL query to create a new Artist with the supplied attributes.
    const sql =
        'INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed)' +
        'VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)';
    const values = {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed,
    };

    db.run(sql, values, function (error) {
        // 31. In the callback function of this SQL query, check for errors and pass them down the middleware
        // chain. If no errors are present, you will need to retrieve the newly-created artist from the database
        // to return it in the response.
        // Using the sqlite3 lastID attribute, write a SQL query to retrieve the new artist from the database.
        // Then send it in the response body with a 201 status code.
        // When you think your POST route is ready, run the testing suite to check your work.
        if (error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`, (error, artist) => {
                res.status(201).json({ artist: artist });
            });
        }
    });
});

// 32. Add a PUT handler at /:artistId to your router. Check to ensure all required fields are present in the
// request body, if not send a 400 response.
artistsRouter.put('/:artistId', (req, res, next) => {
    const name = req.body.artist.name,
        dateOfBirth = req.body.artist.dateOfBirth,
        biography = req.body.artist.biography,
        isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;
    if (!name || !dateOfBirth || !biography) {
        return res.sendStatus(400);
    }
    // 33. Execute a SQL statement to update the artist with the supplied artist ID to have the supplied updated
    // attributes.
    const sql =
        'UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, ' +
        'biography = $biography, is_currently_employed = $isCurrentlyEmployed ' +
        'WHERE Artist.id = $artistId';
    const values = {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed,
        $artistId: req.params.artistId,
    };

    db.run(sql, values, (error) => {
        // 34. In the callback of the update statement, pass any errors down the middleware chain, if present.
        // Otherwise, retrieve the newly-updated artist from the database and send it in the response with
        // a 200 status code.
        // When you think your PUT route is ready, run the testing suite to check your work.
        if (error) {
            next(error);
        } else {
            db.get(
                `SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`,
                (error, artist) => {
                    res.status(200).json({ artist: artist });
                }
            );
        }
    });
});

// 35. Finally, let’s add our delete handler. This will be slightly different than a normal delete — instead of
// deleting the artist, we will mark them as unemployed.
// Add a delete handler at /:artistId. Within the handler’s callback function, run a SQL query to update the
// artist with the supplied artist ID to have is_currently_employed equal to 0.
// Handle any errors and send successfully-updated artists with 200 responses.
// When you think your DELETE route is ready, run the testing suite to check your work.
// At this point when you load the X-Press Publishing app, a list of all saved artists should load on the
// landing page. Clicking one of them should allow you to view, update, and delete that artist. You should
// additionally be able to create new artists by clicking the ‘New Artist’ button on the landing page.
artistsRouter.delete('/:artistId', (req, res, next) => {
    const sql = 'UPDATE Artist SET is_currently_employed = 0 WHERE Artist.id = $artistId';
    const values = { $artistId: req.params.artistId };

    db.run(sql, values, (error) => {
        if (error) {
            next(error);
        } else {
            db.get(
                `SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`,
                (error, artist) => {
                    res.status(200).json({ artist: artist });
                }
            );
        }
    });
});

module.exports = artistsRouter;
