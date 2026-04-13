const TimeDisplay = document.getElementById("timer");
let segundos = 0;

setInterval(function() {
  segundos++;

  let h = Math.floor(segundos / 3600);
  let m = Math.floor((segundos % 3600) / 60);
  let s = segundos % 60;

  // Formato 00:00:00
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  document.getElementById("timer").textContent = h + ":" + m + ":" + s;

  // Cada 10 minutos (600 segundos)
  if (segundos % 600 === 0) {
    document.getElementById("sonido").play();
  }

}, 1000);
