const params = new URLSearchParams(window.location.search);
const nettmug = document.getElementById('nettmug');
const nettshop = document.getElementById('nettshop');

let grandpaAmount = parseInt(params.get('grandpas')) || 0;
let count = parseInt(params.get('count')) || 0;
let cookieUpgradeAmount = parseInt(params.get('cookieUpgrades')) || 0;

function updateSite() {
    params.set("count", count);
    params.set("grandpas", grandpaAmount);
    params.set("cookieUpgrades", cookieUpgradeAmount);
    history.replaceState(null, "", "?" + params.toString());
}

function passiveIncome() {
    count += grandpaAmount;
    update();
    updateSite();
}

function update() {
    if (score)
        score.textContent = `Score: ${count}`;
}

function shop_button() { 
    window.location.href = history.replaceState(null, "/shop", "?" + params.toString());
}

function mug_button() { 
    window.location.href = history.replaceState(null, "/mug", "?" + params.toString());
}

nettshop.addEventListener('click', shop_button);
nettshop.addEventListener('click', mug_button);

update();
updateSite();
setInterval(passiveIncome, 1000);
