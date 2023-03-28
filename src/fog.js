import * as THREE from "three";

export default function example() {
  const canvas = document.getElementById("three-canvas");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setClearColor("#00ff00", 1.0);
  renderer.setClearAlpha(0.5);

  const scene = new THREE.Scene();

  scene.background = new THREE.Color("#000000"); // scene >> renderer

  scene.fog = new THREE.Fog("black", 3, 7);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.y = 1;
  camera.position.z = 5;

  scene.add(camera);

  // DirectionalLight: 태양빛과 비슷 위에서 내리쬐는 느낌(색상, 강도)
  const light = new THREE.DirectionalLight(0xffffff, 1);

  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 2;

  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial: light에 반응하지 않음
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  // const mesh = new THREE.Mesh(geometry, material);

  const meshes = new Array(10).fill(0).map(() => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    return mesh;
  });

  // scene.add(mesh);

  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    meshes.forEach(mesh => {
      mesh.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);

    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => setSize(camera, scene, renderer));

  draw();
  // renderer.setAnimationLoop(draw);
}
