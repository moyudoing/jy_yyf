export function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('products-video');
    const playButton = document.querySelector('.play-button');
    const poster = document.querySelector('.video-poster');

    if (!videoContainer || !video || !playButton) return;

    // 添加视频海报
    video.poster = './assets/images/video/poster.jpg';

    playButton.addEventListener('click', () => {
        video.play();
        videoContainer.classList.add('playing');
        if (poster) poster.style.display = 'none';
    });

    video.addEventListener('pause', () => {
        videoContainer.classList.remove('playing');
    });

    video.addEventListener('ended', () => {
        videoContainer.classList.remove('playing');
    });
}
