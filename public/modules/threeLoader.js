import * as THREE from '../../node_modules/three/build/three.module.js';
import { DeviceOrientationControls } from './DeviceOrientationControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(screen.width, screen.height);
container.append(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.x = 0;
cube.position.y = -5;
cube.position.z=2;

const helperGeometry = new THREE.BoxGeometry(15,15,15, 5, 5, 5);
const helperMaterial = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true,
});
const helper = new THREE.Mesh(helperGeometry, helperMaterial);
scene.add(helper);
controls = new DeviceOrientationControls(camera);


function animate() {
  window.requestAnimationFrame(animate);
  if(enableThreeLoader){
  controls.alpha = alpha;
  controls.beta = beta;
  controls.gamma = gamma;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  controls.update();
  renderer.render(scene, camera);
}
}

//-----------start animations-------------
animate();
