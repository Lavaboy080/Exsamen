const score = document.getElementById('score');
const MUG = document.getElementById('MUG');

function update() {
    if (score)
        score.textContent = `Score: ${count}`;
}

MUG.addEventListener('click',incrise);

function incrise(){
    count ++ ;
    update();
    MUG.classList.toggle('up');
}

