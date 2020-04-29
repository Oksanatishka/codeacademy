const Dinosaur = require('../../models/dinosaur');
const { assert } = require('chai');
// const {mongoose, databaseUrl, options} = require('../../dinosaur-database');
const { connectAndDrop, disconnect } = require('../../dinosaur-database');

describe('Dinosaur', () => {
    // Add hooks here
    beforeEach(
        //     async () => {
        //   await mongoose.connect(databaseUrl, options);
        //     await mongoose.connection.db.dropDatabase();
        // }
        connectAndDrop
    );
    afterEach(
        //   async () => {
        //   await mongoose.disconnect;
        // }
        disconnect
    );

    describe('#save', () => {
        it('persists a dino', async () => {
            const fields = {
                name: 'Velociraptor',
                count: 3,
                risk: 'High'
            };
            const dino = new Dinosaur(fields);

            await dino.save();
            const stored = await Dinosaur.find({ name: 'Velociraptor' });

            assert.strictEqual(stored.length, 1);
            assert.include(stored[0], fields);
        });
    });

    describe('#name', () => {
        it('is a String', () => {
            const dino = new Dinosaur({
                name: 'T-rex'
            });

            assert.strictEqual(dino.name, 'T-rex');
        });

        it('is required', () => {
            const dino = new Dinosaur({});

            const error = dino.validateSync();

            assert.equal(error.errors.name.message, 'Path `name` is required.');
            assert.equal(error.errors.name.kind, 'required');
        });
    });

    describe('#count', () => {
        it('is invalid with 11', () => {
            const dino = new Dinosaur({
                name: 'T-rex',
                count: 11,
                risk: 'High'
            });
            dino.validateSync();

            assert.ok(dino.errors, 'model should have validation error');
            // Add assertion here
            assert.strictEqual(dino.errors.count.message, 'Cannot hold more than 10 dinosaurs.');
        });

        // Add next test here
        it('is valid with 10', () => {
            const dino = new Dinosaur({
                name: 'Triceratops',
                count: 10,
                risk: 'Low'
            });

            dino.validateSync();

            assert.isUndefined(dino.errors, 'model should be valid');
        });
    });

    describe('#risk', () => {
        it('is a String', () => {
            const dino = new Dinosaur({
                name: 'T-rex',
                risk: 'High'
            });

            assert.strictEqual(dino.risk, 'High');
        });
    });

    describe('.findByName', () => {
        it('returns the first match on name', async () => {
            const fields = {
                name: 'Pterodactyl',
                count: 5,
                risk: 'Low'
            };
            const dino = new Dinosaur(fields);
            await dino.save();

            const stored = await Dinosaur.findByName('Pterodactyl');

            assert.include(stored, fields);
        });
    });

    describe('#breed', () => {
        it('increases count by 1', () => {
            const start = 3;
            const end = 4;
            const dino = new Dinosaur({
                name: 'Stegosaurus',
                count: start,
                risk: 'Low'
            });

            dino.breed();
            assert.strictEqual(dino.count, end);
        });
    });
});
