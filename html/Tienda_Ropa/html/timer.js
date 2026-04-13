window.onload = function () {
  let segundos = 0;
  const timer = document.getElementById("timer");
  const sonido = document.getElementById("sonido");

  setInterval(function () {
    segundos++;

    let h = Math.floor(segundos / 3600);
    let m = Math.floor((segundos % 3600) / 60);
    let s = segundos % 60;

    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    timer.textContent = h + ":" + m + ":" + s;

    if (segundos % 600 === 0 && sonido) {
      sonido.play().catch(function () {});
    }
  }, 1000);
};