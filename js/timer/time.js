const TimeDisplay = document.getElementById("TimePanel");
function updateTime() {
//step1: get the current time
const date= new Date();
console.log(date);
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
TimeDisplay.innerText = date.getSeconds();




}

setInterval(updateTime, 1);