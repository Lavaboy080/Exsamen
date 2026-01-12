let count = 0;
const score = document.getElementById('score');
const MUG = document.getElementById('MUG');
function update(){
    if (score)
     score.textContent = `Score: ${count}`;
}

function incrise(){
    count ++ ;
    update();
    MUG.classList.toggle('up');
}

MUG.addEventListener('click',incrise);

update();
