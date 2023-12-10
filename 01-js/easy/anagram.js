/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let biggerStr = str1.length > str2.length ? str1 : str2;
  let smallStr = biggerStr.length > str2.length ? str2 : str1;
  for (char of biggerStr) {
    if (smallStr.search(char) < 0) {
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;
