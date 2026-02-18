
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
//timerLabel.textContent = '00:00';
//+timerLabel.style.fontSize = "150px";
//this bucle means that for each iteration of the loop, the font size of the timerLabel element will first increase from 150px to 240px in increments of 10px, 
// and then decrease back to 150px in decrements of 10px. 
// The console.log statement will output the current font size to the console during each iteration of the loop.
// associate the click event with afunction, so that
// each time when the button is clocked, the function
// will be called
let fontsize = 20;
let maxsize = 80;
let minsize = 20;
let isgrowing = false;
startButton.addEventListener('click', function () {
  setInterval(() => {
    //the logic of this method is to increase the font size of the timerLabel element by 1 pixel every 230 milliseconds until it reaches a maximum size of 110 pixels,
    //  at which point it resets back to 40 pixels and continues the cycle. This creates a pulsating effect on the timer label.

    // 1 if the font size is greater than or equal to 110 pixels, it resets the font size back to 40 pixels and continues the cycle.
    //the size of the timerLabel element will increase by 1 pixel every 230 milliseconds until it reaches 110 pixels, at which point it will reset back to 40 pixels and continue the cycle.
    //2 if the size of the timerLabel element is greater than or equal to 110 pixels, it will reset back to 40 pixels and continue the cycle. 
    // This creates a pulsating effect on the timer label.
    // the size of the timerLabel element will increase by 1 pixel every 230 milliseconds until it reaches 110 pixels,
    //  at which point it will reset back to 40 pixels and continue the cycle. This creates a pulsating effect on the timer label.
    if (!isgrowing) {
      fontsize--;

      timerLabel.style.fontSize = fontsize + "px";
      if (fontsize <= minsize) {
        isgrowing = true;
      }

    }
    else {
      fontsize++;
      timerLabel.style.fontSize = fontsize + "px";
      if (fontsize >= maxsize) {
        isgrowing = false;
      }

    }



  }, 100);
});
function resetTimer() {

}
stopButton.addEventListener('click', () => { });
resetButton.addEventListener('click', () => { });
sizeanimation();
function sizeanimation() {
  let size = 40;
  let x = 1000;
  while (x == 0)
    for (let i = 0; i < 10; i++) {
      size++;
      timerLabel.style.fontSize = size + "px";
      for (let j = 0; j < 10; j++) {
        size--;
        timerLabel.style.fontSize = size + "px";
      }
    }
}
