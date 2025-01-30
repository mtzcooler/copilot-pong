let screenw = 800;
let screenh = 400;

let ball;
let player, cpu;

let ballImage;
let playerImage;
let cpuImage;
let fundoImage;
let bounceSound;
let goalSound;

function preload() {
    ballImage = loadImage('./img/bola.png');
    playerImage = loadImage('./img/barra02.png');
    cpuImage = loadImage('./img/barra01.png');
    fundoImage = loadImage('./img/fundo2.png');
    bounceSound = loadSound('./sound/message.oga');
    goalSound = loadSound('./sound/hum.ogg');
}

function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    player = new Paddle(true);
    cpu = new Paddle(false);
    ball.reset();
}

function draw() {
    // background(50);

    image(fundoImage, 0, 0, screenw, screenh);
    ball.update(player, cpu);
    ball.show();
    player.update(true);
    player.show(true);
    cpu.update(false);
    cpu.show(false);
}

class Ball {

    constructor() {
        this.r = 12;
    }

    update(player, cpu) {
        this.x += this.vx;
        this.y += this.vy;

        //if collision with top or bottom
        if (this.y < 0 || this.y > screenh) {
            this.vy *= -1;
        }

        //if collision with paddle
        let playerCollision = this.x - this.r < player.w && this.y > player.y && this.y < player.y + player.h;
        let cpuCollision = this.x + this.r > screenw - cpu.w && this.y > cpu.y && this.y < cpu.y + cpu.h;
        if (playerCollision || cpuCollision) {
            this.vx *= -1.1;
            this.va *= -1.1;
            bounceSound.play();
        }

        //if collision with right or left wall
        if (this.x < 0 || this.x > screenw) {
            this.reset();
            goalSound.play();
        }
    }

    show() {
        // fill(255);
        // ellipse(this.x, this.y, this.r * 2);

        //rotate the ball and draw it
        push();
        this.a += this.va;
        translate(this.x, this.y);
        rotate(this.a);
        image(ballImage, 0, 0, this.r * 2, this.r * 2);
        pop();
    }

    reset() {
        this.x = screenw / 2;
        this.y = screenh / 2;
        this.vx = random(-1, 1) * 5 * 1.3;
        this.vy = random(-1, 1) * 3 * 1.2;
        this.a = 0;
        this.va = 0.02;
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

    show(isPlayer) {
        // fill(255);
        // rect(this.x, this.y, this.w, this.h);

        //draw the paddle
        if (isPlayer) {
            image(playerImage, this.x, this.y, this.w, this.h);
        }
        else {
            image(cpuImage, this.x, this.y, this.w, this.h);
        }
    }
}
