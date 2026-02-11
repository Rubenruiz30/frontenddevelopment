
/* "document* object represents the whole html document */
//a tree data structure
// document.getElementById() method returns the element that has the ID attribute with the specified value. If no such element exists, it returns null.
//this method or command allows us to retrieve an elemnt
// in our page
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const timerLabel = document.getElementById('timerLabel');


console.debug(resetButton);

console.log(startButton);
console.log(stopButton);
// console.log(timerLabel);
timerLabel.textContent = '00:00';
timerLabel.style.fontSize = "150px";
//this bucle means that for each iteration of the loop, the font size of the timerLabel element will first increase from 150px to 240px in increments of 10px, 
// and then decrease back to 150px in decrements of 10px. 
// The console.log statement will output the current font size to the console during each iteration of the loop.
let size = 40;
let x = 1000;
while(x ==0)
for (let i = 0; i < 10; i++) {
   size ++;
   timerLabel.style.fontSize = size + "px";
  for (let j = 0; j < 10; j++) {
    size --;
    timerLabel.style.fontSize = size + "px";
}       
}
