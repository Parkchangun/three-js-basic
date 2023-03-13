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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // camera.position.x = 2;
  // camera.position.y = 2;
  camera.position.z = 5;

  // 하늘에서 내려다 보는 것처럼 보임 - 원근감 X
  // const camera = new THREE.OrthographicCamera(
  //   -(window.innerWidth / window.innerHeight), // left
  //   window.innerWidth / window.innerHeight, // right
  //   1, // top
  //   -1, // bottom
  //   0.1,
  //   1000
  // );

  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 20; //각도
  // camera.lookAt(0, 0, 0);
  // camera.zoom = 0.5;
  // camera.updateProjectionMatrix();

  scene.add(camera);

  // DirectionalLight: 태양빛과 비슷 위에서 내리쬐는 느낌(색상, 강도)
  const light = new THREE.DirectionalLight(0xffffff, 1);

  light.position.x = 1;
  light.position.z = 2;

  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasicMaterial: light에 반응하지 않음
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  let animateRef = null;

  const clock = new THREE.Clock();

  function draw() {
    // 절대 시간
    // const time = clock.getElapsedTime();
    // 이전 시간과 현재 시간의 시간 간격 -> ElapsedTime과 같이 쓰면 절대 안도미
    const delta = clock.getDelta();

    // Radian 각도 사용
    // 360도 = 2파이 360 == 6.3
    // mesh.rotation.y += THREE.MathUtils.degToRad(0.5);
    mesh.rotation.y += delta;
    mesh.position.y += delta;

    renderer.render(scene, camera);

    if (mesh.position.y < 1.5) {
      console.log("call request animation frame");
      animateRef = window.requestAnimationFrame(draw);
    } else {
      console.log("end");
      window.cancelAnimationFrame(animateRef);
    }
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
