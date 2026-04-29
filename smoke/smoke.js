const Min_size = 0.1;
const min_speed_y = 0.1;
const max_speed_x = 0.5;
const num_particles = 10;
const canvas = document.getElementById("smoke_canvas")
console.log(canvas)
const ctx =  canvas.getContext("2d")
// define de colour that we want to use for our drawings
ctx.fillStyle = "rgb(53, 72, 91)";
// prepare to draw a path
ctx.beginPath();
//draw an arc
ctx.arc(2, 3, 2, 0, Math.PI * 2);
// fill the object that we have drawn
ctx.fill();
class Smoke {
    constructor() {
        this.particles = [];
    }
    add(particle){
        this.particles.push(particle);
    }
}

class Particle {
    constructor(x, y) {
        this.size = Math.random() * 5 + Min_size;
        this.color = 'rgba(255,255,255,0.5)';
        this.speedX = Math.random() * 2 + max_speed_x;
        this.speedY = Math.random() * 2 + min_speed_y;
        this.x = x;
        this.y = y;
    }
    // update the current states of a particle
    update(){
        this.size = size -= 1
        // this.size = this.size -1
    }
    draw(){
        
    }
}

const smoke = new Smoke();
console.log(smoke);

window.addEventListener('mousemove', (e) => {
    console.log(e);
    console.log(e.clientX);
    console.log(e.clientY);
    // CREATE PARTICLES 
    for (let index = 0; index < num_particles; index++) {
        const particle = new Particle(e.clientX, e.clintY);
        smoke.add(particle);
        console.log(smoke.particles);
    }
});
        