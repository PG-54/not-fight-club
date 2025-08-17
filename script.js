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
        van.style.display = 'none';
        document.querySelector('.CHARACTER').style.display = 'flex';       
        document.querySelector('.char-creation').style.top = '100%';
        document.querySelector('.char-creation-submit').play();
        charCreateAudio.pause();
        document.querySelector('.char-settings input[type="text"]').value = document.querySelector('.char-creation input').value;
        document.querySelectorAll('.char-name').forEach(field => field.innerHTML = document.querySelector('.char-creation input').value)
    }, 10)
    setTimeout(() => document.querySelector('.char-creation').style.display = 'none', 3000)
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
}