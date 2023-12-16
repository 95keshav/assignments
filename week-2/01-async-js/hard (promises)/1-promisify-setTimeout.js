/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  let t = n * 1000;
  let p = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
  return p;
}

module.exports = wait;
