<template>
  <section id="video" class="video-section">
    <div class="container">

      <div class="section-header">
        <h2 class="section-title">产品视频</h2>
        <p class="section-subtitle">了解我们的产品工艺和特点</p>
      </div>

      <div class="video-container">
        <video ref="videoRef" id="products-video" class="video-player">
          <source src="@/assets/videos/introduce.mp4" type="video/mp4">
          您的浏览器不支持视频播放
        </video>
        <div class="video-overlay" @click="togglePlay">
          <div class="play-button">
            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
          </div>
        </div>
        <div class="video-controls">
          <div class="video-btn-group">
            <button class="video-btn" @click="togglePlay">
              <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
            </button>
            <button class="video-btn" @click="rewind">
              <i class="fas fa-backward"></i>
            </button>
            <button class="video-btn" @click="forward">
              <i class="fas fa-forward"></i>
            </button>
          </div>
          <div class="video-progress" @click="seek($event)" @mousemove="showProgressHover($event)" @mouseleave="hideProgressHover">
            <div class="video-progress-bar" :style="{ width: progress + '%' }"></div>
            <div class="video-progress-hover" :style="{ left: hoverProgressLeft + 'px' }" v-if="showProgressTooltip">
              {{ formatTime(hoverProgressTime) }}
            </div>
          </div>
          <div class="volume-control">
            <button class="video-btn" @click="toggleMute">
              <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
            </button>
            <div class="volume-slider" @click="setVolume($event)">
              <div class="volume-level" :style="{ width: volume + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 引用视频元素
const videoRef = ref<HTMLVideoElement | null>(null);
// 播放状态
const isPlaying = ref(false);
// 静音状态
const isMuted = ref(false);
// 视频进度
const progress = ref(0);
// 音量
const volume = ref(100);
// 进度条悬停信息
const showProgressTooltip = ref(false);
const hoverProgressLeft = ref(0);
const hoverProgressTime = ref(0);

// 切换播放状态
const togglePlay = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause();
    } else {
      videoRef.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

// 快退
const rewind = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 10);
  }
};

// 快进
const forward = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.min(videoRef.value.duration, videoRef.value.currentTime + 10);
  }
};

// 拖动进度条
const seek = (event: MouseEvent) => {
  if (videoRef.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    videoRef.value.currentTime = (percent / 100) * videoRef.value.duration;
  }
};

// 显示进度条悬停信息
const showProgressHover = (event: MouseEvent) => {
  if (videoRef.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    hoverProgressLeft.value = offsetX;
    hoverProgressTime.value = (percent / 100) * videoRef.value.duration;
    showProgressTooltip.value = true;
  }
};

// 隐藏进度条悬停信息
const hideProgressHover = () => {
  showProgressTooltip.value = false;
};

// 切换静音状态
const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
    isMuted.value = videoRef.value.muted;
  }
};

// 设置音量
const setVolume = (event: MouseEvent) => {
  if (videoRef.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    videoRef.value.volume = percent / 100;
    volume.value = percent;
  }
};

// 格式化时间
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// 更新视频进度
const updateProgress = () => {
  if (videoRef.value) {
    progress.value = (videoRef.value.currentTime / videoRef.value.duration) * 100;
    requestAnimationFrame(updateProgress);
  }
};

// 视频播放结束处理
const handleVideoEnded = () => {
  isPlaying.value = false;
  progress.value = 0;
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('timeupdate', updateProgress);
    videoRef.value.addEventListener('ended', handleVideoEnded);
  }
});

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener('timeupdate', updateProgress);
    videoRef.value.removeEventListener('ended', handleVideoEnded);
  }
});
</script>

<style scoped>

/* 视频部分容器 */
.video-section {
  position: relative;
  background: var(--background-alt);
  padding: var(--spacing-3xl) 0;
}

/* 视频容器 */
.video-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  aspect-ratio: 16/9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: var(--background-dark);
}

/* 视频播放器 */
.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 视频覆盖层 */
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

/* 播放按钮 */
.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-button i {
  font-size: 2rem;
  color: white;
}

.play-button:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 视频控制器 */
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
}

.video-container:hover .video-controls {
  opacity: 1;
  transform: translateY(0);
}

/* 控制按钮组 */
.video-btn-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.video-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.video-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.video-btn i {
  font-size: 1.25rem;
}

/* 进度条 */
.video-progress {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  cursor: pointer;
  position: relative;
}

.video-progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--background-dark);
  border-radius: var(--radius-full);
}

.video-progress-hover {
  position: absolute;
  top: -20px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  display: none;
}

.video-progress:hover .video-progress-hover {
  display: block;
}

/* 音量控制 */
.volume-control {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.volume-slider {
  width: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.volume-control:hover .volume-slider {
  width: 60px;
}

.volume-level {
  height: 100%;
  background: white;
  width: 100%;
  transform-origin: left;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .video-container {
    width: 90%;
  }

  .video-controls {
    padding: var(--spacing-sm);
  }

  .video-btn {
    width: 32px;
    height: 32px;
  }

  .video-btn i {
    font-size: 1rem;
  }

  .volume-control {
    display: none;
  }
}
</style>
