<template>
  <div ref="container" class="molecule-container">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps<{
  structure: string;
  displayStyle: 'wireframe' | 'ball-and-stick' | 'space-filling';
}>();

const container = ref<HTMLElement>();
const scene = ref<THREE.Scene>();
const camera = ref<THREE.PerspectiveCamera>();
const renderer = ref<THREE.WebGLRenderer>();
const controls = ref<OrbitControls>();
const errorMessage = ref<string>('');
const isVisible = ref(false);

// 使用 useIntersectionObserver 实现懒加载
const { stop } = useIntersectionObserver(
    container,
    ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting;
      if (isIntersecting) {
        stop();
      }
    }
);

const initScene = () => {
  scene.value = new THREE.Scene();
  camera.value = new THREE.PerspectiveCamera(
      75,
      container.value!.clientWidth / container.value!.clientHeight,
      0.1,
      1000
  );
  renderer.value = new THREE.WebGLRenderer({ antialias: true });
  renderer.value.setSize(
      container.value!.clientWidth,
      container.value!.clientHeight
  );
  container.value!.appendChild(renderer.value.domElement);

  // 设置相机位置
  camera.value.position.z = 5;

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.value.add(ambientLight);

  // 添加平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.value.add(directionalLight);

  // 添加轨道控制器
  controls.value = new OrbitControls(
      camera.value,
      renderer.value.domElement
  );
};

const loadModel = () => {
  const loader = new GLTFLoader();
  loader.load(
      `/models/molecules/${props.structure}.glb`,
      (gltf: any) => {
        configureModelMaterials(gltf.scene);
        scene.value!.add(gltf.scene);
      },
      undefined,

  );
};

const configureModelMaterials = (model: THREE.Object3D) => {
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshPhongMaterial({
        color: props.displayStyle === 'wireframe' ? 0xffffff : 0x3498db,
        wireframe: props.displayStyle === 'wireframe'
      });
    }
  });
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.value?.update();
  renderer.value?.render(scene.value!, camera.value!);
};

onMounted(() => {
  initScene();
});

watchEffect(() => {
  if (isVisible.value) {
    loadModel();
    animate();
  }
});

watchEffect(() => {
  if (scene.value) {
    configureModelMaterials(scene.value);
  }
});
</script>

<style scoped>
.molecule-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-weight: bold;
}
</style>
