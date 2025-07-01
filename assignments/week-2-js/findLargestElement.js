/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let largestElement = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largestElement) {
            largestElement = numbers[i];
        }
    }
    return largestElement;
}

const arr = [2, 3, 5, 3, 2, 1];
console.log(findLargestElement(arr));

module.exports = findLargestElement;
