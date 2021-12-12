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

const helperGeometry = new THREE.BoxGeometry(150, 150, 150, 5, 5, 5);
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

/*
cube -> global
in threeLoader: cube = new THREE.Mesh osv

output.eventlistener("click", placeCube(e){
  get controls.alpha, beta, gamma. (gjør om til coordinater i )
  set cube.position.x,y,z (camera er i 0,0,0)
  include cube.postion in animate? Eller går det uten fordi cube er en del av scenen?
})

feste en modell over punkter funnet i harriscorner?
lag en 3d mode: endre farge og størrelse på cuben? 
en edgedetection mode: klikk lager firkanter som fanger hjørner
skru av/på magnetometer og akselerometer: show rotasjonsdata, akselerasjon og distance traveled from startpoint

*/

function animate() {
  window.requestAnimationFrame(animate);
  if(enableThreeLoader){
  controls.alpha = alpha;
  controls.beta = beta;
  controls.gamma = gamma;
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  controls.update();
  //camera.getWorldDirection();
  renderer.render(scene, camera);
}
}

//-----------start animations-------------
animate();
