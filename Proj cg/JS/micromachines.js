/*global THREE*/

var camera, scene, renderer;

var geometry, material, mesh;

var ring;

function render() {
	'use strict';
	
	renderer.render(scene, camera);
}

function addBorders(obj, x, y, z) {
	'use strict';
	
	for(var i=0; i< 23; i++) {
		createRing(49.5-i*4.5, 0, 55);
		createRing(49.5-i*4.5, 0, -55);
		createRing(50, 0, 55-i*5);
		createRing(-50, 0, 55-i*5);
	}
	
	for(i=0; i<29; i++) {
		createRing(70-i*4.84, 0, 70.5);
		createRing(70-i*4.84, 0, -69.5);
		createRing(70, 0, 70.5-i*5);
		createRing(-70, 0, 70.5-i*5);
	}

}

function addBorders2(obj, x, y, z) {
	'use strict';
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
	
	addTable(table, 0, 0, 0);
	
	scene.add(table);
	
	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
	
	//if (Math.random() < 0.5)
		addBorders();
	//else 
	//	addBorders2();
	
}

function createRing(x, y, z) {
	'use strict';
	
	ring = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false});
	geometry = new THREE.TorusGeometry(1, 1, 10);
	mesh = new THREE.Mesh(geometry, material);
	
	ring.add(mesh);
	ring.position.set(x, y, z);
	
	scene.add(ring);
}

function createCamera() {
	'use strict';
	
	camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 30;
	camera.position.y = 70;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
	
	createTable(0, 0, 0);
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