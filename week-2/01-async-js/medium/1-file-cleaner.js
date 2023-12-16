const fs = require("fs");
const { resolve } = require("path");
const path = "./week-2/01-async-js/easy/";
const file = path + "4-write-to-file.txt";
const encoding = "utf-8";
function getData() {
  let p = new Promise((resolve) => {
    fs.readFile(file, encoding, (err, data) => {
      resolve(data);
    });
  });
  return p;
}

//the regular expression /\s+/g is used to match one or more whitespace characters (\s+).
//The g flag ensures that the replacement is applied globally throughout the string.
//The replace method is then used to replace each sequence of multiple whitespaces with a single space.
async function cleanData() {
  const str = await getData();
  console.log(str.replace(/\s+/g, " "));
}

cleanData();
