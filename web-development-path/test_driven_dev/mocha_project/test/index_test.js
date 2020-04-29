const assert = require('assert');
const Rooster = require('../index');

describe('Rooster', () => {
    describe('.announceDawn', () => {
        it('returns a rooster call', () => {
            // setup
            const expected = 'moo!';
            //exercise
            const c = Rooster.announceDawn();

            // verify
            assert.ok(c == expected);
        });
    });
    describe('.timeAtDawn', () => {
        it('returns its argument as a string', () => {
            //setup
            const inputNumber = 12;
            const expected = '12';

            // exercise
            const c = Rooster.timeAtDawn(inputNumber);

            //verify
            assert.equal(c, expected);
        });
        it('throws an error if passed a number less than 0', () => {
            //setup
            const inputNumber = -1;
            const expected = RangeError;
            // exercise

            //verify
            assert.throws(() => {
                Rooster.timeAtDawn(inputNumber); // exercise
            }, expected);
        });
        it('throws an error if passed a number greater than 23', () => {
            //setup
            const inputNumber = 24;
            const expected = RangeError;

            // exercise

            //verify
            assert.throws(() => {
                Rooster.timeAtDawn(inputNumber); // exercise
            }, expected);
        });
    });
});
