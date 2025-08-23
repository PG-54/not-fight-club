document.querySelector('.fight-music').volume = .2;
document.querySelector('.chill-music').volume = .2;
document.querySelector('.player-hit').volume = .4;
document.querySelector('.enemy-hit').volume = .4;

const charCreateAudio = document.querySelector('.char-creation-bg-music');
charCreateAudio.volume = .1;
const bgMusicPlay = () => charCreateAudio.play();
const interactionEvents = [
    'click',
    'keydown',
    'mousemove',
    'scroll',
    'touchstart',
    'touchend',
    'wheel'
];
interactionEvents.forEach(interaction => {
    window.addEventListener(interaction, bgMusicPlay);
})
const van = document.querySelector('.van-sound');
van.volume = .1;
van.addEventListener('click', () => van.play());

document.querySelector('.char-creation button').addEventListener('click', () => {
    if (!document.querySelector('.char-creation input').value) {
        alert('Введите имя');
        return;
    }

    interactionEvents.forEach(interaction => {
        window.removeEventListener(interaction, bgMusicPlay)
    })
    setTimeout(() => {
        document.querySelector('body').style.pointerEvents = 'none'
        van.style.display = 'none';
        document.querySelector('.CHARACTER').style.display = 'flex';       
        document.querySelector('.char-creation').style.top = '100%';
        document.querySelector('.char-creation-submit').play();
        charCreateAudio.pause();
        document.querySelector('.char-settings input[type="text"]').value = document.querySelector('.char-creation input').value;
        document.querySelectorAll('.char-name').forEach(field => field.innerHTML = document.querySelector('.char-creation input').value);
        player.name = document.querySelector('.char-creation input').value;
    }, 10)
    setTimeout(() => {
        document.querySelector('.char-creation').style.display = 'none';
        document.querySelector('.chill-music').play();
        document.querySelector('body').style.pointerEvents = 'all'
    }, 4000)
})

function toggleCharEditMenu() {
    const settings = document.querySelector('.char-settings');
    settings.style.left == '30px' ? settings.style.left = '-830px' : settings.style.left = '30px';
}

function changeCharImage(event) {
    document.querySelectorAll('img.char-image').forEach(img => img.src = event.target.src);
}
document.querySelectorAll('.char-settings div > img').forEach(img => img.addEventListener('click', changeCharImage));

document.querySelector('.char-settings div input').addEventListener('change', event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        let img = document.createElement('img');
        img.src = e.target.result;
        img.addEventListener('click', changeCharImage);
        document.querySelector('.char-settings div').prepend(img);
    }
    reader.readAsDataURL(file);
})


document.querySelector('.char-settings > label img[alt="edit"]').addEventListener('click', (e) => {
    e.target.style.display = 'none';
    document.querySelector('.char-settings > label img[alt="submit"]').style.display = 'block';
    document.querySelector('.char-settings > label img[alt="cancel"]').style.display = 'block';
    document.querySelector('.char-settings > label input').readOnly = false;
})



document.querySelector('.char-settings > label img[alt="submit"]').addEventListener('click', (e) => {
    const newName = document.querySelector('.char-settings > label input').value;
    document.querySelectorAll('.char-name').forEach(p => p.innerHTML = newName)
    player.name = newName;

    document.querySelector('.char-settings > label input').readOnly = true;
    e.target.style.display = 'none';
    document.querySelector('.char-settings > label img[alt="cancel"]').style.display = 'none';
    document.querySelector('.char-settings > label img[alt="edit"]').style.display = 'block';
})

document.querySelector('.char-settings > label img[alt="cancel"]').addEventListener('click', (e) => {
    document.querySelector('.char-settings > label input').value = document.querySelector('.char-name').innerHTML;
    
    document.querySelector('.char-settings > label input').readOnly = true;
    e.target.style.display = 'none';
    document.querySelector('.char-settings > label img[alt="submit"]').style.display = 'none';
    document.querySelector('.char-settings > label img[alt="edit"]').style.display = 'block';
})


function switchPage(page) {
    if (document.querySelector('.char-settings').style.left == '30px') document.querySelector('.char-settings').style.left = '-830px'
    document.querySelectorAll('section').forEach(section => section.classList.toggle('disabled', true));
    document.querySelector(page).classList.toggle('disabled', false);
    document.querySelector('header p').innerHTML = page.slice(1);

    document.querySelector('.FIGHT > button').classList.toggle('disabled', false);
    document.querySelector('.Fight').classList.toggle('disabled', true);
    
    document.querySelector('.fight-music').pause();
    document.querySelector('.fight-music').currentTime = 0;
    document.querySelector('.chill-music').play();

    document.getElementById('overlay').classList.toggle('disabled', true);
    document.getElementById('win').classList.toggle('disabled', true);
    document.getElementById('loose').classList.toggle('disabled', true);

}

const player = {
    name : '',
    damage : 20,
    attackZones : 1,
    health : 150,
    deffenceZones : 2,
}
const enemies = [
    {
        src : 'assets/characters/dragon.jpg',
        name : 'DRAGON',
        damage : 40,
        attackZones : 1,
        health : 180,
        deffenceZones : 1,
    },
    {
        src : 'assets/characters/ogre.jpg',
        name : 'OGRE',
        damage : 20,
        attackZones : 1,
        health : 150,
        deffenceZones : 3,
    },
    {
        src : 'assets/characters/goblin.jpg',
        name : 'GOBLIN',
        damage : 15,
        attackZones : 3,
        health : 80,
        deffenceZones : 1,
    }
]

function chooseEnemy() {
    const random = Math.random();
    if (random < .3) return enemies[0];
    if (random < .7) return enemies[1];
    else return enemies[2];
}
let enemy;
function startFight() {
    enemy = chooseEnemy()
    
    document.querySelector('.fight-options .attack-zones p span').innerHTML = player.attackZones;
    document.querySelector('.fight-options .deffence-zones p span').innerHTML = player.deffenceZones;

    document.querySelectorAll('.Fight .player .health-points span').forEach(span => span.innerHTML = player.health);
    playerHealthBar.style.width = '100%';
    
    document.querySelectorAll('.Fight .enemy .health-points span').forEach(span => span.innerHTML = enemy.health);
    enemyHealthBar.style.width = '100%'; 
    document.querySelector('.Fight .enemy-name').innerHTML = enemy.name;
    document.querySelector('.Fight .enemy img').src = enemy.src;

    setTimeout(() => {
        document.querySelector('.FIGHT > button').classList.toggle('disabled', true);
        document.querySelector('.Fight').classList.toggle('disabled', false);
    }, 200);

    document.querySelector('.chill-music').pause();
    document.querySelector('.chill-music').currentTime = 0;
    document.querySelector('.fight-music').currentTime = 0;
    document.querySelector('.fight-music').play();
}

document.querySelectorAll('.fight-options input').forEach(input => input.addEventListener('change', () => {
    const button = document.querySelector('.fight-options button');

    if (document.querySelectorAll('.fight-options .attack-zones input:checked').length == player.attackZones
        && document.querySelectorAll('.fight-options .deffence-zones input:checked').length == player.deffenceZones) {
        button.style.filter = 'saturate(1)';
        button.style.pointerEvents = 'all';
    }
    else {
        button.style.filter = 'saturate(.2)';    
        button.style.pointerEvents = 'none';    
    }
}))


function getRandomIndex() {
    while (true) {
        const random = Math.ceil((Math.random() * 10));
        if (random < 6) return random-1;
    }
}

function createEnemyZoneSelection(amount) {
    const zones = ['Head', 'Neck', 'Body', 'Belly', 'Legs'];
    const res = [];
    let i = amount;
    while (i > 0) {
        let index = getRandomIndex();
        if (!res.includes(zones[index])) {
            res.push(zones[index]);
            i--;
        }
    }
    return res;
}

const currentPlayerHealth = document.querySelector('.Fight .player .current-health');
const playerHealthBar = document.querySelector('.Fight .player .health-bar');
const currentEnemyHealth = document.querySelector('.Fight .enemy .current-health');
const enemyHealthBar = document.querySelector('.Fight .enemy .health-bar');
const fightLog = document.querySelector('.fight-log')

function fightRound() {

    const playerAttacks = Array.from(document.querySelectorAll('.fight-options .attack-zones input:checked')).map(input => input.value) 
    const enemyDeffence = createEnemyZoneSelection(enemy.deffenceZones);

    while (playerAttacks.length) {
        let playerAttack = playerAttacks.pop()
        if (enemyDeffence.includes(playerAttack)) {
            const p = document.createElement('p');
            p.innerHTML = `<span class="fight-log-pink">${player.name}</span> attacked <span class="fight-log-pink">${enemy.name}</span> to <span class="fight-log-pink">${playerAttack}</span> but ${enemy.name} was able to protect his ${playerAttack}`;
            fightLog.append(p);
            continue;
        };

        currentEnemyHealth.innerHTML = +currentEnemyHealth.innerHTML - player.damage;
        let percentage = +currentEnemyHealth.innerHTML / enemy.health * 100;
        if (percentage < 0) percentage = 0;
        enemyHealthBar.style.width = `${percentage}%`
        const p = document.createElement('p');
        p.innerHTML = `<span class="fight-log-pink">${player.name}</span> attacked <span class="fight-log-pink">${enemy.name}</span> to <span class="fight-log-pink">${playerAttack}</span> and dealt <span class="fight-log-damage">${player.damage} damage</span>`;
        fightLog.append(p);

        document.querySelector('.enemy-hit').currentTime = 0;
        document.querySelector('.enemy-hit').play();
        document.querySelector('.enemy .fight-char-image-wrapper div').classList.toggle('disabled', false);
        setTimeout(() => {
            document.querySelector('.enemy .fight-char-image-wrapper div').classList.toggle('disabled', true);
        }, 300)
    }

    const enemyAttacks = createEnemyZoneSelection(enemy.attackZones);
    const playerDeffence = Array.from(document.querySelectorAll('.fight-options .deffence-zones input:checked')).map(input => input.value) 

    while (enemyAttacks.length) {
        let enemyAttack = enemyAttacks.pop()
        if (playerDeffence.includes(enemyAttack)) {
            const p = document.createElement('p');
            p.innerHTML = `<span class="fight-log-pink">${enemy.name}</span> attacked <span class="fight-log-pink">${player.name}</span> to <span class="fight-log-pink">${enemyAttack}</span> but ${player.name} was able to protect his ${enemyAttack}`;
            fightLog.append(p);
            continue;
        };

        currentPlayerHealth.innerHTML = +currentPlayerHealth.innerHTML - enemy.damage;
        let percentage = +currentPlayerHealth.innerHTML / player.health * 100;
        if (percentage < 0) percentage = 0;
        playerHealthBar.style.width = `${percentage}%`
        const p = document.createElement('p');
        p.innerHTML = `<span class="fight-log-pink">${enemy.name}</span> attacked <span class="fight-log-pink">${player.name}</span> to <span class="fight-log-pink">${enemyAttack}</span> and dealt <span class="fight-log-damage">${enemy.damage} damage</span>`;
        fightLog.append(p);

        document.querySelector('.player-hit').currentTime = 0;
        document.querySelector('.player-hit').play();
        document.querySelector('.player .fight-char-image-wrapper div').classList.toggle('disabled', false);
        setTimeout(() => {
            document.querySelector('.player .fight-char-image-wrapper div').classList.toggle('disabled', true);
        }, 300)
    }

    if (+currentPlayerHealth.innerHTML <= 0) {
        document.querySelector('.enemy .fight-char-image-wrapper div').classList.toggle('disabled', true);
        document.querySelector('.player .fight-char-image-wrapper div').classList.toggle('disabled', true);

        fightLog.innerHTML = '';
        document.querySelector('.fight-music').pause();
        document.getElementById('overlay').classList.toggle('disabled', false);
        document.getElementById('loose').classList.toggle('disabled', false);
        document.querySelector('.loose-sound').currentTime = 0;
        document.querySelector('.loose-sound').play();

        document.querySelector('.statistics .loses').innerHTML = +document.querySelector('.statistics .loses').innerHTML + 1;
        return
    }
    if (+currentEnemyHealth.innerHTML <= 0) {
        document.querySelector('.enemy .fight-char-image-wrapper div').classList.toggle('disabled', true);
        document.querySelector('.player .fight-char-image-wrapper div').classList.toggle('disabled', true);

        fightLog.innerHTML = '';
        document.querySelector('.fight-music').pause();
        document.getElementById('overlay').classList.toggle('disabled', false);
        document.getElementById('win').classList.toggle('disabled', false);
        document.querySelector('.win-sound').currentTime = 0;
        document.querySelector('.win-sound').play();
        document.querySelector('.statistics .wins').innerHTML = +document.querySelector('.statistics .wins').innerHTML + 1;
        return
    }
}