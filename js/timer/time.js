const TimeDisplay = document.getElementById("TimePanel");
function updateTime() {
//step1: get the current time
const date= new Date();
console.log(date);
}
setInterval(updateTime, 1);