// script.js
const player = document.getElementById('player');
const container = document.getElementById('game-container');
let x = 0;
let y = 0;
const speed = 10;

document.addEventListener('keydown',click);

function click(){
    for (let i = 0; i < 5; i++) {
        console.log(i); // prints 0,1,2,3,4
    }
}

function delayedAction() {
  console.log("This happened after a 2-second delay.");
}

setTimeout(delayedAction, 1000);
