export function initVideo() {
    const container = document.querySelector('.video-container');
    const video = document.querySelector('.video-player');
    const overlay = document.querySelector('.video-overlay');
    const playButton = document.querySelector('.play-button');

    if (!container || !video) return;

    // 播放视频
    function playVideo() {
        video.play()
            .then(() => {
                overlay?.classList.add('hidden');
            })
            .catch(error => {
                console.error('视频播放失败:', error);
                showError();
            });
    }

    // 暂停视频
    function pauseVideo() {
        video.pause();
        overlay?.classList.remove('hidden');
    }

    // 显示错误
    function showError() {
        container.innerHTML = `
            <div class="video-error">
                <p>视频加载失败</p>
                <button onclick="location.reload()">重试</button>
            </div>
        `;
    }

    // 绑定事件
    playButton?.addEventListener('click', playVideo);
    video.addEventListener('click', () => {
        video.paused ? playVideo() : pauseVideo();
    });
    video.addEventListener('ended', () => {
        overlay?.classList.remove('hidden');
    });
}
