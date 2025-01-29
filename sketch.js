let ball;
let player, cpu;

let screenw = 800;
let screenh = 400;

function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    player = new Paddle(true);
    cpu = new Paddle(false);
    ball.reset();
}

function draw() {
    background(50);
    ball.update(player, cpu);
    ball.show();
    player.update(true);
    player.show();
    cpu.update(false);
    cpu.show();
}

class Ball {

    constructor() {
        this.x = screenw / 2;
        this.y = screenh / 2;
        this.xspeed = random(-1, 1) * 5 + 3;
        this.yspeed = random(-1, 1) * 3 + 2;
        this.r = 12;
    }

    update(player, cpu) {
        this.x += this.xspeed;
        this.y += this.yspeed;

        //if collision with top or bottom
        if (this.y < 0 || this.y > screenh) {
            this.yspeed *= -1;
        }

        //if collision with left paddle
        let playerCollision = this.x - this.r < player.w && this.y > player.y && this.y < player.y + player.h;
        let cpuCollision = this.x + this.r > screenw - cpu.w && this.y > cpu.y && this.y < cpu.y + cpu.h;
        if (playerCollision || cpuCollision) {
            this.xspeed *= -1.1;
        }

        //if collision with right or left wall
        if (this.x < 0 || this.x > screenw) {
            this.reset();
        }
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2);
    }

    reset() {
        this.x = screenw / 2;
        this.y = screenh / 2;
        this.xspeed = random(-1, 1) * 5 + 3;
        this.yspeed = random(-1, 1) * 3 + 2;
    }
}

class Paddle {

    constructor(isPlayer) {
        this.w = 10;
        this.h = 100;
        this.y = height / 2 - this.h / 2;
        this.x = isPlayer ? 0 : width - this.w;
    }

    update(isPlayer) {
        if (isPlayer) {
            this.y = mouseY - this.h / 2;
        }
        else {
            if (ball.y > this.y + this.h / 2) {
                this.y += 1;
            }
            else if (ball.y < this.y + this.h / 2) {
                this.y -= 1;
            }
        }

        // limit the paddle movement
        this.y = constrain(this.y, 0, height - this.h);
    }

    show() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}
