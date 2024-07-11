function currentTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();


    h = (h < 10) ?  "0" + h : h;
    m = (m < 10) ?  "0" + m : m;
    s = (s < 10) ?  "0" + s : s;

    let time = h + ":" + m + ":" + s;
    let clock = document.querySelector ('#Digital');
    clock.innerHTML = time;

   let hRotation = ((h % 12) * 180) /6;
   let mRotation = (m * 180) / 30;
   let sRotation = (s * 180) / 30;

   document.querySelector('#hours').style.transform = "rotate(" + hRotation + "deg)";
   document.querySelector('#minutes').style.transform = "rotate(" + mRotation + "deg)";
   document.querySelector('#seconds').style.transform = "rotate(" + sRotation + "deg)";

}

setInterval(currentTime,1000);

const dateElement = document.getElementById('date');

setInterval(() => {
  const now = new Date();
  const date = now.toLocaleDateString();
  dateElement.textContent = date;
}, 1000);