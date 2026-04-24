const score = document.getElementById('score');
const MUG = document.getElementById('MUG');
const savebtn = document.getElementById('save');
const reset = document.getElementById('reset');
let count = sqlscore 
let hasUnsavedChanges = false;

window.addEventListener("beforeunload", function (e) {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = "";
    }
});

async function save() {
    const response = await fetch("/save_score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ count })
    });

    const data = await response.json().catch(() => ({}));
    alert("Saved!");
    hasUnsavedChanges = false;
}


function update() {
    if (score)
        score.textContent = `Score: ${count}`;
}

function incrise(){
    count ++ ;
    hasUnsavedChanges = true;
    update();
    MUG.classList.toggle('up');
}

function startover(){
    count = 0
    score.textContent = `Score: ${count}`;
    update();
} 

reset.addEventListener('click', () => {
    startover();
    save();
});

update();
MUG.addEventListener("click", incrise);
savebtn.addEventListener("click", save);

