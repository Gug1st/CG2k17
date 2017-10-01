/*global THREE*/

var camera, scene, renderer;

var geometry, material, mesh;

var ring;

function render() {
	'use strict';
	
	renderer.render(scene, camera);
}

function addBorders() {
	'use strict';
	
	for(var i=0; i< 21; i++) {
		createRing(48-i*4.5, 0, 53, "x");
		createRing(47.5-i*4.8, 0, -52.5, "x");
		createRing(48, 0, 53-i*5, "x");
		createRing(-48, 0, 53-i*5, "x");
	}
	
	for(i=0; i<29; i++) {
		createRing(70-i*4.84, 0, 70.5, "x");
		createRing(70-i*4.84, 0, -69.5, "x");
		createRing(70, 0, 70.5-i*5, "x");
		createRing(-70, 0, 70.5-i*5, "x");
	}

}

function addWheels(x, y, z) {
		createRing(x+4.3, y+1, z+1.5, "z");
		createRing(x-3.4, y+1, z+1.5, "z");
		createRing(x+4.3, y+1, z-1.5, "z");
		createRing(x-3.4, y+1, z-1.5, "z");
}

function addCar(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.CubeGeometry(7, 1, 7);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	
	obj.add(mesh);
}

function addTable(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.CubeGeometry(150, 0, 150);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	
	obj.add(mesh);
}

function createTable(x, y, z) {
	'use strict';
	
	var table = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
	
	addTable(table, x, y, z);
	
	scene.add(table);
	
	addBorders();
	
}

function createCar(x, y, z) {
	'use strict';
	
	var car = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
	
	addCar(car, x, y, z);
	
	scene.add(car);
	
	addWheels(x, y, z);
}

function createRing(x, y, z, flag) {
	'use strict';
	
	ring = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false});
	geometry = new THREE.TorusGeometry(1, 0.4, 10, 50);
	mesh = new THREE.Mesh(geometry, material);
	
	ring.add(mesh);
	ring.position.set(x, y, z);
	if (flag == "x") {
		ring.rotateX(1.4);
	} else if (flag == "z") {
		ring.rotateY(1.5);
		ring.rotateX(0.55);
	}
	scene.add(ring);
}

function createRingY(x, y, z) {
	'use strict';
	
	ring = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false});
	geometry = new THREE.TorusGeometry(1, 0.4, 10, 50);
	mesh = new THREE.Mesh(geometry, material);
	
	ring.add(mesh);
	ring.position.set(x, y, z);
	
	scene.add(ring);
}

function createCamera() {
	'use strict';
	
	camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 70;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
	
	createTable(0, 0, 0);
	createCar(-63, 0, 0);
}

function init() {
	'use strict';
	
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createCamera();
	
	render();
}