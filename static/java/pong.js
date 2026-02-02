const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const Ball = {
  position: { x: 100, y: 200 },
  velocity: { x: 2, y: -2 },
  radius: 10
};

const Brick = {
  rows: 1,
  columns: 1,
  width: 75,
  height: 20,
  padding: 10,
  offset: { x: 30, y: 30 },
  color: "#0095DD"
};

const bricks = [];

const BrickLayout = {
    totalWidth: Brick.columns * Brick.width + (Brick.columns - 1) * Brick.padding,
    totalHeight: Brick.rows * Brick.height + (Brick.rows - 1) * Brick.padding
};

Brick.offset.x = (canvas.width - BrickLayout.totalWidth) / 2;

for (let c = 0; c < Brick.columns; c++) {
  bricks[c] = [];
  for (let r = 0; r < Brick.rows; r++) {
    bricks[c][r] = {
      x: Brick.offset.x + c * (Brick.width + Brick.padding),
      y: Brick.offset.y + r * (Brick.height + Brick.padding),
      status: 1
    };
  }
}

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
let score = 0;

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

  if (Ball.position.y - Ball.radius < 0) {
    Ball.velocity.y = -Ball.velocity.y;
  }

  if (Ball.position.y + Ball.radius > canvas.height){
    alert("GAME OVER");
    document.location.reload();
    clearInterval(interval);
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

function DrawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function DrawBricks() {
  for (let c = 0; c < Brick.columns; c++) {
    for (let r = 0; r < Brick.rows; r++) {
      const brick = bricks[c][r];
      if (brick.status === 0) continue; // skip destroyed bricks

      ctx.beginPath();
      ctx.rect(brick.x, brick.y, Brick.width, Brick.height);
      ctx.fillStyle = Brick.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

function CheckBrickCollision() {
  for (let c = 0; c < Brick.columns; c++) {
    for (let r = 0; r < Brick.rows; r++) {
      const brick = bricks[c][r];

      if (brick.status === 0) continue;

      if (
        Ball.position.x > brick.x &&
        Ball.position.x < brick.x + Brick.width &&
        Ball.position.y > brick.y &&
        Ball.position.y < brick.y + Brick.height
      ) {
        Ball.velocity.y = -Ball.velocity.y; 
        brick.status = 0;                   
        score++;                             
      }
      

    }
  }
  if (CheckVictory()) {
        clearInterval(interval);
        const foxyGif = document.getElementById("Foxy");
        foxyGif.style.display = "block";
        setTimeout(() => { foxyGif.style.opacity = 1; }, 50); 
    }
}


function CheckVictory() {
  for (let c = 0; c < Brick.columns; c++) {
    for (let r = 0; r < Brick.rows; r++) {
      if (bricks[c][r].status === 1) return false; 
    }
  }
  return true; 
}



function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawBricks();
    DrawBall();
    MoveBall();
    DrawPaddle();
    MovePaddle();
    CheckPaddleCollision();
    CheckBrickCollision();
    DrawScore();
}


interval = setInterval(run, 10);