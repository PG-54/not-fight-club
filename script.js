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
    if (!document.querySelector('.char-creation input').value) return;
    if (document.querySelector('.char-creation input').value.length > 30) {
        alert('Имя не может быть длиннее 30 символов!');
        return
    }
    interactionEvents.forEach(interaction => {
        window.removeEventListener(interaction, bgMusicPlay)
    })
    setTimeout(() => {
        document.querySelector('.CHARACTER').style.display = 'flex';       
        document.querySelector('.char-creation').style.top = '100%';
        document.querySelector('.char-creation-submit').play();
        charCreateAudio.pause();
        document.querySelectorAll('.char-name').forEach(field => field.innerHTML = document.querySelector('.char-creation input').value)
    }, 10)
    setTimeout(() => document.querySelector('.char-creation').style.display = 'none', 3000)
})