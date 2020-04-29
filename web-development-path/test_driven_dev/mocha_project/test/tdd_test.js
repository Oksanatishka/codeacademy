const assert = require('assert');
const Calculate = require('../tdd');

describe('Calculate', () => {
    describe('.sum', () => {
        it('returns the sum of an array of numbers', () => {
            // assert.equal(Calculate.sum([1, 2, 3]), 6);

            // TDD: Refactor
            // setup
            const expectedResult = 6;
            const input = [1, 2, 3];

            // exercise
            const result = Calculate.sum(input);

            // verify
            assert.equal(result, expectedResult);
        });
        // Second test goes here
        it('returns the sum of a four-item list', () => {
            const expectedResult = 22;
            const inputArray = [4, 5, 6, 7];

            const result = Calculate.sum(inputArray);

            assert.equal(result, expectedResult);
        });

        it('returns zero for an empty array', () => {
            const expectedResult = 0;
            const inputArray = [];

            const result = Calculate.sum(inputArray);

            assert.equal(result, expectedResult);
        });
    });
    describe('.factorial', () => {
        it('test if the output of 5! is equal to 120.', () => {
            // setup
            const input = 5;
            const expected = 120;

            // exercise
            const c = Calculate.factorial(input);

            // verify
            assert.equal(c, expected);
        });

        it('test if the output of 3! is equal to 6.', () => {
            // setup
            const input = 3;
            const expected = 6;

            // exercise
            const c = Calculate.factorial(input);

            // verify
            assert.equal(c, expected);
        });

        it('edge case of 0!=1', () => {
            // setup
            const input = 0;
            const expected = 1;

            // exercise
            const c = Calculate.factorial(input);

            // verify
            assert.equal(c, expected);
        });
    });
});
