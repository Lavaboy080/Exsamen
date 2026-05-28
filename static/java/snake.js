const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");


const width = 10;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let interval = null;
let fruitIndex = 0;

function createGrid() {
  grid.innerHTML = "";
  squares = [];

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

function drawSnake() {
  currentSnake.forEach(index => {
    squares[index].classList.add("snake");
  });
}

function move() {
  const head = currentSnake[0];
  const newHead = head + direction;

  if (
    newHead < 0 ||
    newHead >= squares.length ||
    (direction === 1 && head % width === width - 1) ||
    (direction === -1 && head % width === 0) ||
    squares[newHead].classList.contains("snake")
  ) {
    clearInterval(interval);
    alert("Game Over");
    return;
  }

  // Remove tail
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");

  // Add new head
  currentSnake.unshift(newHead);
  squares[newHead].classList.add("snake");
}



function control(e) {
  const key = e.key.toLowerCase();

  if ((key === "arrowright" || key === "d") && direction !== -1) {
    direction = 1;
  } 
  else if ((key === "arrowup" || key === "w") && direction !== width) {
    direction = -width;
  } 
  else if ((key === "arrowleft" || key === "a") && direction !== 1) {
    direction = -1;
  } 
  else if ((key === "arrowdown" || key === "s") && direction !== -width) {
    direction = width;
  }
}

function startGame() {
  createGrid();
  addFruit();

  currentSnake = [2, 1, 0];
  direction = 1;

  drawSnake();

  clearInterval(interval);
  interval = setInterval(move, 200);
}



function addFruit() {
  fruitIndex = Math.floor(Math.random() * squares.length);
  squares[fruitIndex].classList.add("fruit");
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);