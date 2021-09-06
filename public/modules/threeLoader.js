console.log('hello world');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
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

camera.position.z = 5;
camera.rotation.x = 0;
camera.rotation.y = 0;
camera.rotation.z = 0;

function animate() {
  requestAnimationFrame(animate);
  camera.rotation.x = xPosRot;
  camera.rotation.y = yPosRot;
  camera.rotation.z = zPosRot;
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
