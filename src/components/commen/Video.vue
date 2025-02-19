<template>
  <div class="video-container">
    <video class="video-player" @click="togglePlayPause" ref="videoRef">
      <source :src="videoSrc" type="video/mp4">
      您的浏览器不支持视频播放。
    </video>
    <div class="video-overlay" :class="{ hidden: isPlaying }" @click="playVideo">
      <button class="play-button">播放</button>
    </div>
    <div v-if="hasError" class="video-error">
      <p>视频加载失败</p>
      <button @click="reloadVideo">重试</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 视频源地址，可根据实际情况修改
const videoSrc = ref('your-video-url.mp4');
const videoRef = ref(null);
const isPlaying = ref(false);
const hasError = ref(false);

const playVideo = () => {
  const video = videoRef.value;
  video.play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(error => {
        console.error('视频播放失败:', error);
        hasError.value = true;
      });
};

const pauseVideo = () => {
  const video = videoRef.value;
  video.pause();
  isPlaying.value = false;
};

const togglePlayPause = () => {
  const video = videoRef.value;
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
};

const reloadVideo = () => {
  const video = videoRef.value;
  video.load();
  hasError.value = false;
  playVideo();
};

onMounted(() => {
  const video = videoRef.value;
  video.addEventListener('ended', () => {
    isPlaying.value = false;
  });
});
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.video-player {
  width: 100%;
  height: auto;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.video-overlay.hidden {
  opacity: 0;
  pointer-events: none;
}

.play-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #fff;
  border: none;
  cursor: pointer;
}

.video-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
