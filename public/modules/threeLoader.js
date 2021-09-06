import * as THREE from '../../node_modules/three/build/three.module.js';
import { DeviceOrientationControls } from './DeviceOrientationControls.js';
var container = document.getElementById('container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.append(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const helperGeometry = new THREE.BoxGeometry(100, 100, 100, 4, 4, 4);
const helperMaterial = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true,
});
const helper = new THREE.Mesh(helperGeometry, helperMaterial);
scene.add(helper);
controls = new DeviceOrientationControls(camera);

camera.position.z = 5;
camera.rotation.x = 0;
camera.rotation.y = 0;
camera.rotation.z = 0;

function animate() {
  window.requestAnimationFrame(animate);
  controls.alpha = alpha;
  controls.beta = beta;
  controls.gamma = gamma;
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
