document.querySelector('.fight-music').volume = .2;
document.querySelector('.chill-music').volume = .2;

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
        character.name = document.querySelector('.char-creation input').value;
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
    character.name = newName;

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
}

const character = {
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
        health : 110,
        deffenceZones : 1,
    }
]

function chooseEnemy() {
    const random = Math.random();
    if (random < .3) return enemies[0];
    if (random < .7) return enemies[1];
    else return enemies[2];
}

function startFight() {
    const enemy = chooseEnemy()
    
    document.querySelector('.fight-options .attack-zones p span').innerHTML = character.attackZones;
    document.querySelector('.fight-options .deffence-zones p span').innerHTML = character.deffenceZones;

    document.querySelectorAll('.Fight .player .health-points span').forEach(span => span.innerHTML = character.health);
    document.querySelector('.Fight .player .health-bar').style.backgroundImage = 'linear-gradient(to right, var(--color-winx) 100%, black 100%)'; 
    
    document.querySelectorAll('.Fight .enemy .health-points span').forEach(span => span.innerHTML = enemy.health);
    document.querySelector('.Fight .enemy .health-bar').style.backgroundImage = 'linear-gradient(to left, var(--color-winx) 100%, black 100%)'; 
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

    if (document.querySelectorAll('.fight-options .attack-zones input:checked').length == character.attackZones
        && document.querySelectorAll('.fight-options .deffence-zones input:checked').length == character.deffenceZones) {
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