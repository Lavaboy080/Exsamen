const score = document.getElementById('score');
const MUG = document.getElementById('MUG');
let grandpaAmount = 0
let count = 0


function sendScore(score) {
    fetch("/save_score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ score: score })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success"){
            console.log("Score lagret!");
        } else {
            console.log("Feil ved lagring av score:", data);
        }
    })
    .catch(error => console.error("Error:", error));
}

function passiveIncome() {
    count += grandpaAmount;
    update();
}

function update() {
    if (score)
        score.textContent = `Score: ${count}`;
}

function incrise(){
    count ++ ;
    update();
    MUG.classList.toggle('up');
}

MUG.addEventListener('click', () => {
    incrise();
    sendScore(count);
});

update();
setInterval(passiveIncome, 1000);
