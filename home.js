const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songs = document.querySelectorAll('.song');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const albumArt = document.querySelector('.album-art');
const coverImage = document.getElementById('cover-image');
const bars = document.querySelectorAll('.bar');
const audioPlayer = document.getElementById('audio-player');

let isPlaying = false;
let currentSong = 0;

// Initialize with first song cover
coverImage.src = songs[0].getAttribute('data-cover');

function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? 'Pause' : 'Play';
    albumArt.classList.toggle('playing', isPlaying);
    
    if (isPlaying) {
        audioPlayer.play();
        startVisualizerAnimation();
    } else {
        audioPlayer.pause();
        stopVisualizerAnimation();
    }
}

function changeSong(index) {
    songs.forEach(song => song.classList.remove('playing'));
    songs[index].classList.add('playing');
    currentSong = index;
    
    // Change audio source
    const audioSrc = songs[index].getAttribute('data-audio');
    audioPlayer.src = audioSrc;
    
    // Change cover image
    const coverSrc = songs[index].getAttribute('data-cover');
    coverImage.src = coverSrc;
    
    // Reset progress and time displays
    if (isPlaying) {
        audioPlayer.play();
    }
}

let visualizerInterval;

function startVisualizerAnimation() {
    visualizerInterval = setInterval(() => {
        bars.forEach(bar => {
            const height = Math.random() * 100;
            bar.style.height = `${height}px`;
        });
    }, 100);
}

function stopVisualizerAnimation() {
    clearInterval(visualizerInterval);
    bars.forEach(bar => {
        bar.style.height = '0px';
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function nextSong() {
    const nextIndex = (currentSong + 1) % songs.length;
    changeSong(nextIndex);
}

function previousSong() {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    changeSong(prevIndex);
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);

nextBtn.addEventListener('click', () => {
    nextSong();
});

prevBtn.addEventListener('click', () => {
    previousSong();
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width);
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

songs.forEach((song, index) => {
    song.addEventListener('click', () => {
        changeSong(index);
        if (!isPlaying) {
            togglePlay();
        }
    });
});

// Audio event listeners for progress and time updates
audioPlayer.addEventListener('timeupdate', () => {
    // Update progress bar
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percent}%`;
    
    // Update time display
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('ended', () => {
    nextSong();
});

// Load metadata to display duration
audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});