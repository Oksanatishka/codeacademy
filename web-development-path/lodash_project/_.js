// This object will represent our library containing all the functionality we add to it.
// > node _.js
// > node test/lodash.js

// 1. Implement _.clamp() - Number method (Clamps number within the inclusive lower and upper bounds).
// 2. Implement .inRange() - Number method (Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with start then set to 0. If start is greater than end the params are swapped to support negative ranges.)
// 3. Implement .words() - String method (Splits string into an array of its words.)
// 4. Implement .pad() - String method (Pads string on the left and right sides if it's shorter than length. Padding characters are truncated if they can't be evenly divided by length.)
// 5. Implement _.has() - Object method (Checks if path is a direct property of object.)
//          .has() checks to see if the provided object contains a value at the specified key
//          .has() will return true if the object contains a value at the key and will return false if not
//          Your method does not need to accept the additional path parameter;
// 6. Implement _.invert() - Object method (Creates an object composed of the inverted keys and values of object. If object contains duplicate values, subsequent values overwrite property assignments of previous values.)
// 7. ?? Implement _.findKey() - Object method (This method is like _.find except that it returns the key of the first element predicate returns truthy for instead of the element itself.)
// 8. Implement _.drop() - Array method (Creates a slice of array with n elements dropped from the beginning.)
// 9. ?? Implement _.dropWhile() - Array method (Creates a slice of array excluding elements dropped from the beginning. Elements are dropped until predicate returns falsey. The predicate is invoked with three arguments: (value, index, array).)
// 10. Implement _.chunk() - Array method (Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.)

var _ = {
    clamp: function(number, lower, upper) {
        let lowerClampedValue = Math.max(number, lower);
        let clampedValue = Math.min(lowerClampedValue, upper);
        return clampedValue;
    },
    inRange: function(number, start, end) {
        // console.log(arguments);
        if (arguments.length == 2) {
            end = start;
            start = 0;
        }
        if (start > end) {
            let temp = start;
            start = end;
            end = temp;
        }
        // console.log('Range', start, end);
        if (number >= start && number < end) {
            return true;
        } else {
            return false;
        }
    },
    words: function(str) {
        return str.split(' ');
    },
    pad: function(str, len) {
        if (len <= str.length) {
            return str;
        }
        if (len > str.length) {
            let numStart = Math.floor((len - str.length) / 2);
            let numEnd = len - str.length - numStart;

            // let arr = Array.from(str);
            // while (numStart != 0) {
            //     arr.unshift(' ');
            //     numStart--;
            // }
            // while (numEnd != 0) {
            //     arr.push(' ');
            //     numEnd--;
            // }

            // return arr.join('');

            let paddedString = ' '
                .repeat(numStart)
                .concat(str)
                .concat(' '.repeat(numEnd));
            return paddedString;
        }
    },
    has: function(obj, key) {
        if (!obj[key]) {
            return false;
        } else {
            return true;
            // return obj[key];
        }
    },
    invert: function(obj) {
        let values = Object.values(obj);
        let keys = Object.keys(obj);

        let result = {};
        for (let i = 0; i < values.length; i++) {
            if (result[values[i]] != 'undefined') {
                result[values[i]] = keys[i];
            }
        }
        return result;
    },
    findKey: function(obj, predicate) {
        for (let key in obj) {
            let value = obj[key];
            let predicateReturnValue = predicate(value);
            if (predicateReturnValue) {
                return key;
            }
        }
        return undefined;
    },
    drop(arr, n) {
        if (arguments.length === 2) {
            return arr.slice(n);
        } else {
            return arr.slice(1);
        }
    },
    dropWhile(arr, predicate) {
        const cb = (el, i) => {
            return !predicate(el, i, arr);
        };
        let dropNum = arr.findIndex(cb);
        let droppedArr = this.drop(arr, dropNum);
        return droppedArr;
    },
    chunk(arr, size) {
        if (arguments.length != 2) {
            size = 1;
        }
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let arrayChunk = arr.slice(i, i + size);
            i = i + size - 1;
            result.push(arrayChunk);
        }
        return result;
    }
};

console.log('clamp');
console.log(_.clamp(-10, -5, 5)); // => -5
console.log(_.clamp(10, -5, 5)); // => 5

console.log('\ninRange');
console.log(_.inRange(3, 2, 4)); // true
console.log(_.inRange(4, 8)); // true
console.log(_.inRange(4, 2)); // false
console.log(_.inRange(2, 2)); // false
console.log(_.inRange(1.2, 2)); // true
console.log(_.inRange(5.2, 4)); // false

console.log('\nwords');
console.log(_.words('fred, barney, & pebbles')); // ['fred', 'barney', 'pebbles']
// console.log(_.words('fred, barney, & pebbles', /[^, ]+/g)); // ['fred', 'barney', '&', 'pebbles']

console.log('\npad');
console.log(_.pad('abc', 8)); // '  abc   '
// console.log(_.pad('abc', 8, '_-')); // '_-abc_-_'
console.log(_.pad('abc', 3)); // 'abc'
console.log(_.pad('hello', 4)); // 'abc'

console.log('\nhas');
var object = { a: { b: 2 } };
console.log(_.has(object, 'a')); // true

console.log('\ninvert');
var object = { a: 1, b: 2, c: 1 };
console.log(_.invert(object)); // { '1': 'c', '2': 'b' }

console.log('\nfindKey');
// var users = {
//     barney: { age: 36, active: true },
//     fred: { age: 40, active: false },
//     pebbles: { age: 1, active: true }
// };
// console.log(
//     _.findKey(users, function(o) {
//         return o.age < 40;
//     })
// ); // 'barney'
// console.log(_.findKey(users, { age: 1, active: true })); // 'pebbles'
// console.log(_.findKey(users, ['active', false])); // 'fred'
// console.log(_.findKey(users, 'active')); // 'barney'

console.log('\ndrop');
console.log(_.drop([1, 2, 3])); // [2, 3]
console.log(_.drop([1, 2, 3], 2)); // [3]
console.log(_.drop([1, 2, 3], 5)); // []
console.log(_.drop([1, 2, 3], 0)); // [1, 2, 3]

console.log('\ndropWhile');

console.log('\nchunk');
console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); // [['a', 'b'], ['c', 'd']]
console.log(_.chunk(['a', 'b', 'c', 'd'], 3)); // [['a', 'b', 'c'], ['d']]

// Do not write or modify code below this line.
module.exports = _;
