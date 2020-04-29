// Create Artist Table
// 14. Next, we will write the code to create the Artist table. In the root directory, open migration.js.
// Import sqlite3. It should already be installed from when you ran npm install at the beginning of the project.

const sqlite3 = require('sqlite3');
// 15. Open the database.sqlite file as a sqlite3 database object and save it to a variable.
const db = new sqlite3.Database('./database.sqlite');

db.serialize(function() {
    // 16. On the database object, run a SQLite command to create an Artist table (if it doesn’t already exist) with the following schema:
    // id - Integer, primary key, required
    // name - Text, required
    // date_of_birth - Text, required
    // biography - Text, required
    // is_currently_employed - Integer, defaults to 1

    // 17. Once you’ve finished writing the migration. Run node migration.js in a terminal to run the migration.
    // Once the migration has finished running, open database.sqlite using DB Browser to ensure your table looks
    // as expected. Then try inserting values into the table to ensure it works.
    // [Download DB Browser for SQLite app https://sqlitebrowser.org/]
    // When you think your table is ready, run the testing suite by running npm test in a terminal to check your
    // work for the Artist table.
    db.run(
        'CREATE TABLE IF NOT EXISTS `Artist` ( ' +
            '`id` INTEGER NOT NULL, ' +
            '`name` TEXT NOT NULL, ' +
            '`date_of_birth` TEXT NOT NULL, ' +
            '`biography` TEXT NOT NULL, ' +
            '`is_currently_employed` INTEGER NOT NULL DEFAULT 1, ' +
            'PRIMARY KEY(`id`) )'
    );

    // Create Series Table
    // 36. Now, let’s move on to our next model. Open migration.js and write the code to create a new table
    // called Series, if one doesn’t already exist. The table should have the following column properties:
    // id - Integer, primary key, required
    // name - Text, required
    // description - Text, required
    // 37. Run migration.js via command line. Use DB Browser to ensure your table was properly set up -
    // examining table properties and inserting data into the table. When you think your table is ready,
    // run the testing suite to check your work.
    db.run(
        'CREATE TABLE IF NOT EXISTS `Series` ( ' +
            '`id` INTEGER NOT NULL, ' +
            '`name` TEXT NOT NULL, ' +
            '`description` TEXT NOT NULL, ' +
            'PRIMARY KEY(`id`) )'
    );

    // Create Issue Table
    // 45. Let’s move on to our last model. Open migration.js and write the code to create a new table called
    // Issue, if one doesn’t already exist. The table should have the following column properties:
    // id - Integer, primary key, required
    // name - Text, required
    // issue_number - Integer, required
    // publication_date - Text, required
    // artist_id - Integer, foreign key, required
    // series_id - Integer, foreign key, required
    // 46. Run migration.js via command line. Use DB Browser to ensure your table was properly set up -
    // examining table properties and inserting data into the table. When you think your table is ready, run the
    // testing suite to check your work.
    db.run(
        'CREATE TABLE IF NOT EXISTS `Issue` ( ' +
            '`id` INTEGER NOT NULL, ' +
            '`name` TEXT NOT NULL, ' +
            '`issue_number` INTEGER NOT NULL, ' +
            '`publication_date` TEXT NOT NULL, ' +
            '`artist_id` INTEGER NOT NULL, ' +
            '`series_id` INTEGER NOT NULL, ' +
            'PRIMARY KEY(`id`), ' +
            'FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`id`), ' +
            'FOREIGN KEY(`series_id`) REFERENCES `Series`(`id`) )'
    );
});
