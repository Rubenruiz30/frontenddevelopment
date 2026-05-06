const MIN_SIZE = 10
const MIN_SPEED_Y = 0.1
const MAX_SPEED_X = 0.5
const NUM_PARTICLES = 10

const canvas = document.getElementById('smoke_canvas')
const ctx = canvas.getContext('2d')

// Importante: dar tamaño real al canvas
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Smoke {
  constructor () {
    this.particles = []
  }

  add (particle) {
    this.particles.push(particle)
  }

  animate () {
    // Limpiar canvas en cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let index = 0; index < this.particles.length; index++) {
      this.particles[index].update()

      if (this.particles[index].size <= 0.3) {
        this.particles.splice(index, 1)
        index--
      }
    }

    requestAnimationFrame(() => this.animate())
  }
}

class Particle {
  constructor (x, y) {
    this.size = Math.random() * 5 + MIN_SIZE

    // Ponlo oscuro para probar si se ve
    this.color = 'rgba(0, 0, 0, 0.5)'

    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * -2 - MIN_SPEED_Y

    this.x = x
    this.y = y
  }

  update () {
    this.x += this.speedX
    this.y += this.speedY
    this.size -= 0.1

    this.draw()
  }

  draw () {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const smoke = new Smoke()

window.addEventListener('mousemove', e => {
  for (let index = 0; index < NUM_PARTICLES; index++) {
    const particle = new Particle(e.clientX, e.clientY)
    smoke.add(particle)
  }
})

smoke.animate()