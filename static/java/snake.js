const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const snakescore = document.getElementById('snakescore');
const width = 10;

let snakecount = snakesqlscore 
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let interval = null;
let fruitIndex = 0;

async function save() {
    const response = await fetch("/save_snakescore", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ snakecount })
    });

    const data = await response.json().catch(() => ({}));
    hasUnsavedChanges = false;
}

function update() {
    if (snakescore)
        snakescore.textContent = `Score: ${snakecount}`;
}

function incrise(){
    snakecount ++ ;
    hasUnsavedChanges = true;
    update();
}

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
    save();
    alert("Game Over! score saved!");
    return;
  }

  // Remove tail
  if (!squares[newHead].classList.contains("fruit")){
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
  }

  else{
    squares.forEach(square => square.classList.remove("fruit"));
    addFruit();
    incrise();
  }
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
  snakecount = 0
  update();
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
update();
document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
