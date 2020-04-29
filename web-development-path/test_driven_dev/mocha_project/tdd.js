const Calculate = {
    sum(inputArray) {
        if (inputArray.length === 0) {
            return 0;
        }
        return inputArray.reduce((a, b) => a + b, 0);

        // let totalSum = 0;
        // const inputArrayLength = inputArray.length;
        // for (let i = 0; i < inputArrayLength; i++) {
        //     totalSum += inputArray[i];
        // }
        // return totalSum;
    },
    factorial(num) {
        if (num === 0) {
            return 1;
        }
        for (let i = num - 1; i >= 1; i--) {
            num *= i;
        }
        return num;
    }
};

module.exports = Calculate;
