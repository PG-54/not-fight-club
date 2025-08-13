const charCreateAudio = document.querySelector('.char-creation-bg-music');
charCreateAudio.volume = .1
const bgMusicPlay = () => charCreateAudio.play()
window.addEventListener('click', bgMusicPlay);
const van = document.querySelector('.van-sound');
van.volume = .2
van.addEventListener('click', () => van.play())