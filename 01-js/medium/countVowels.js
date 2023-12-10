/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let vowels = [...str.toLowerCase().matchAll("[aeiou]")];
  // let result = 0;
  // for (char of str.toLowerCase()) {
  //   if (vowels.search(`[${char}]`) > -1) {
  //     result = result + 1;
  //   }
  // }
  return vowels.length;
}

module.exports = countVowels;
