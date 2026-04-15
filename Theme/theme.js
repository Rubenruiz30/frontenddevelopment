const btns = document.querySelectorAll('.theme-btn');

const bd = document.querySelector('body');
console.log(btns);
console.log(bd);
// iterate all theme buttons to associate each button the corresponding task
// a task that we want to execute when ocurring a click event
for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    console.log(btn);

    btn.addEventListener('click', () => {
        console.log(btn.getAttribute('data-theme'));

        console.log(btn.getAttribute('class'));

        document

        bd.className = btn.getAttribute('data-theme');


    });



}

