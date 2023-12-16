function myTimeOut() {
  let p = new Promise((resolve) => {
    setTimeout(() => {
      console.log("2 sec hoge bro");
    }, 2000);
  });
  return p;
}

function dasoJi() {
  let a = myTimeOut();
  console.log(a);
}

async function hunDaso() {
  let a = await myTimeOut();
  console.log(a);
}

dasoJi();
hunDaso();
