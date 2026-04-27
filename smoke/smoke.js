
const  Min_size = 0.1;
const min_speed = 0.1;
const max_speed = 0.5;
Window.addEvenListener('mousemove', (e) => {});
class smoke{

}

class Practicle{
    constructor(){
        this.size = Math.random() * 5 + Min_size;
        this.color = 'rgba(255,255,255,0.5)';
        this.speedX = Math.random() * (max_speed - min_speed) + min_speed;
        this.speedY = Math.random() * (max_speed - min_speed) + min_speed;
        this.x = 0;
        this.y = 0;
    }
}