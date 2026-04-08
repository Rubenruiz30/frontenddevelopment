function finalTask() {
    console.log("This is the final task.");
    // Call the next task in the call stack
}
function seconTask() {
    console.log("This is the second task.");
    // Call the final task
    finalTask();
}
function firstTask() {
    console.log("This is the first task.");
    // Call the second task
    seconTask();
}
firstTask();

function add(num1) {
console.log(num1);
add( ++num1 );
}
add(1);