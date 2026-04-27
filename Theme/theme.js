const btns = document.querySelectorAll('.theme-btn');

const bd = document.querySelector('body');
console.log(btns);
console.log(bd);
// iterate all theme buttons to associate each button the corresponding task
// a task that we want to execute when ocurring a click event
/**for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    console.log(btn);

    btn.addEventListener('click', () => {
        console.log(btn.getAttribute('data-theme'));

        console.log(btn.getAttribute('class'));

        document

        bd.className = btn.getAttribute('data-theme');


    });



}*/

/**localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme")
console.log("current theme =" + theme)
localStorage.removeItem("theme");
console.log("current theme =" + localStorage.getItem("theme"))*/
//step1: read the theme valued stored in the local stored
const theme = localStorage.getItem("theme");
if(theme){// if the theme vavlue exist, no tnull
    // set the current theme to the one selected by th euser
    bd.className = theme;
}
console.log(btns)
btns.forEach(btn => {
console.log(btn);
btn.addEventListener("click",() =>{
    console.log(btn.getAttribute('data-theme'));
    console.log(btn.getAttribute('class'));
    bd.className = btn.getAttribute('data-theme');
    localStorage.setItem("theme", btn.getAttribute('data-theme'));
})    
});

