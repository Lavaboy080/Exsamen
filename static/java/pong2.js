const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const Ball = {
  position: { x: 100, y: 200 },
  velocity: { x: 2, y: -2 },
  radius: 10
};

const Paddle = {
    Width: 200,
    Height: 10,
    position: { x: (canvas.width - 200) / 2, y: canvas.height - 10 },
    velocity: { x: 0, y: 0 }
};

let ballspeed = 2
let paddlespeed =5
let rightPressed = false;
let leftPressed = false;


document.addEventListener("keydown", function(e) {
    const key = e.key.toLowerCase();
    if (e.key === "ArrowRight") rightPressed = true;
    else if (key === "d") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
    else if (key === "a") leftPressed = true;

});

document.addEventListener("keyup", function(e) {
    const key = e.key.toLowerCase();
    if (e.key === "ArrowRight") rightPressed = false;
    else if (key === "d") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
    else if (key === "a") leftPressed = false;
});



function DrawBall() {
  ctx.beginPath();
  ctx.arc(Ball.position.x, Ball.position.y, Ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function MoveBall() {
  Ball.position.x += Ball.velocity.x*ballspeed;
  Ball.position.y += Ball.velocity.y*ballspeed;

  if (Ball.position.x + Ball.radius > canvas.width || Ball.position.x - Ball.radius < 0) {
    Ball.velocity.x = -Ball.velocity.x;
  } 

  if (Ball.position.y + Ball.radius > canvas.height || Ball.position.y - Ball.radius < 0) {
    Ball.velocity.y = -Ball.velocity.y;
  }
}

function DrawPaddle() {
  ctx.beginPath();
  ctx.rect(Paddle.position.x, Paddle.position.y, Paddle.Width, Paddle.Height);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function MovePaddle() {
    if (rightPressed) {
        Paddle.position.x += paddlespeed;
    }
    if (leftPressed) {
        Paddle.position.x -= paddlespeed;
    }

    if (Paddle.position.x < 0) Paddle.position.x = 0;
    if (Paddle.position.x + Paddle.Width > canvas.width) {
        Paddle.position.x = canvas.width - Paddle.Width;
    }
}

function CheckPaddleCollision() {
    if (
        Ball.position.x + Ball.radius >= Paddle.position.x &&
        Ball.position.x - Ball.radius <= Paddle.position.x + Paddle.Width &&
        Ball.position.y + Ball.radius >= Paddle.position.y &&
        Ball.position.y - Ball.radius <= Paddle.position.y + Paddle.Height
    ) {
        Ball.velocity.y = -Ball.velocity.y;
        Ball.position.y = Paddle.position.y - Ball.radius;
    }
}


function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawBall();
    MoveBall();
    DrawPaddle();
    MovePaddle();
    CheckPaddleCollision();
}

setInterval(run, 10);