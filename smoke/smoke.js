const Min_size = 0.1
const min_speed_y = 0.1
const max_speed_x = 0.5
const num_particles = 10
const canvas = document.getElementById('smoke_canvas')
console.log(canvas)
const ctx = canvas.getContext('2d')

class Smoke {
  constructor () {
    this.particles = []
  }
  add (particle) {
    this.particles.push(particle)
  }
  animate(){
    // clear the canvas
    for (let index = 0; index < this.particles.length; index++) {
      // update the states of the particles and draw it on the screen
      this.particles[index].update();
    }
    requestAnimationFrame(animate);

  }
}

class Particle {
  constructor (x, y) {
    this.size = Math.random() * 5 + Min_size
    this.color = 'rgba(255,255,255,0.5)'
    this.speedX = Math.random() * 2 + max_speed_x
    this.speedY = Math.random() * 2 + min_speed_y
    this.x = Math.random() * 2 + x
    this.y = Math.random() * 2 + y
  }
  // update the current states of a particle
  update () {
    this.size = size -= 1
    // this.size = this.size -1
    this.draw();
  }
  draw () {
    // define de colour that we want to use for our drawings
    ctx.fillStyle = this.color
    // prepare to draw a path
    ctx.beginPath()
    //draw an arc
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    // fill the object that we have drawn
    ctx.fill()
  }
}

const smoke = new Smoke()
console.log(smoke)

window.addEventListener('mousemove', e => {
  console.log(e)
  console.log(e.clientX)
  console.log(e.clientY)
  // CREATE PARTICLES
  for (let index = 0; index < num_particles; index++) {
    const particle = new Particle(e.clientX, e.clintY)
    smoke.add(particle)
    console.log(smoke.particles)
  }
})

smoke.animate();