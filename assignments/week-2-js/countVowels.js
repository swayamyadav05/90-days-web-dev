/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').
*/

function countVowels(str) {
    let count = 0;
    const vowels = ["a", "e", "i", "o", "u"];
    for (const char of str) {
        if (vowels.includes(char.toLowerCase())) {
            count += 1;
        }
    }
    return count;
}

const str = "swAyam";
console.log(countVowels(str));
