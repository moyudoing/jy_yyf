export function initVideo() {
    const container = document.querySelector('.video-container');
    const video = document.querySelector('.video-player');
    const controls = document.querySelector('.video-controls');
    const playBtn = document.querySelector('.video-play');
    const muteBtn = document.querySelector('.video-mute');
    const fullscreenBtn = document.querySelector('.video-fullscreen');
    const progress = document.querySelector('.video-progress-bar');
    const volumeSlider = document.querySelector('.volume-slider');

    if (!container || !video) return;

    let isPlaying = false;
    let isMuted = false;

    // 播放控制
    function togglePlay() {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // 音量控制
    function toggleMute() {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ?
            '<i class="fas fa-volume-mute"></i>' :
            '<i class="fas fa-volume-up"></i>';
        updateVolumeUI();
    }

    // 全屏控制
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.log(`全屏错误: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // 更新进度条
    function updateProgress() {
        const percentage = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percentage}%`;
    }

    // 更新音量UI
    function updateVolumeUI() {
        const volumeLevel = document.querySelector('.volume-level');
        volumeLevel.style.transform = `scaleX(${video.muted ? 0 : video.volume})`;
    }

    // 设置音量
    function setVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        video.volume = Math.max(0, Math.min(1, percentage));
        video.muted = false;
        updateVolumeUI();
    }

    // 事件监听
    playBtn?.addEventListener('click', togglePlay);
    muteBtn?.addEventListener('click', toggleMute);
    fullscreenBtn?.addEventListener('click', toggleFullscreen);
    video.addEventListener('timeupdate', updateProgress);
    volumeSlider?.addEventListener('click', setVolume);

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
    });

    // 移动端优化
    if (window.matchMedia('(max-width: 768px)').matches) {
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
    }
}
