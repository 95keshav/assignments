function getTime() {
  const d = new Date();
  const hh = d.getHours();
  const h = hh % 12;
  const amPm = hh < 12 ? "AM" : "PM";
  const m = d.getMinutes();
  const s = d.getSeconds();
  const formated12H = (h < 10 ? "0" : "") + h;
  const formatedM = (m < 10 ? "0" : "") + m;
  const formatedS = (s < 10 ? "0" : "") + s;
  const currenTime = `${hh}:${formatedM}:${formatedS}`;
  const currenTime12h = `${formated12H}:${formatedM}:${formatedS}:${amPm}`;
  process.stdout.write("\r" + currenTime + "  " + currenTime12h);
  //   console.log(currenTime, currenTime12h);
}

setInterval(getTime, 1000);
