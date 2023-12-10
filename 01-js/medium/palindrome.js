/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  return makeCleanString(str) === makeCleanString(reverseString(str))
    ? true
    : false;
}

// bruteforce solution
function reverseString(str) {
  let reversed = [];
  // reversed loop through string to make it backwards
  for (let i = str.length - 1; i >= 0; i--) {
    reversed.push(str[i]);
  }
  //conver array back to string
  return reversed.toString();
}

function makeCleanString(str) {
  // converting to lowercase and removing everything instead lowercase letters;
  return str.toLowerCase().replaceAll(/[^a-z]/g, "");
}

module.exports = isPalindrome;
