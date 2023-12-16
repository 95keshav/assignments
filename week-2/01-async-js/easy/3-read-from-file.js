const fs = require("fs");
const readfilePath = "./week-2/01-async-js/easy/3-read-from-file.md";
const writeFilePath = "./week-2/01-async-js/easy/4-write-to-file.txt";
let count = 0;
let data = "";
fs.readFile(readfilePath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  fs.writeFile(writeFilePath, data, "utf-8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
});

for (let i = 0; i <= 10000000000; i++) {
  count += i;
}
console.log(count);
