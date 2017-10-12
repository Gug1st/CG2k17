var camera, scene, renderer;

var car, ring;
var geometry, material, mesh;

var aspect = window.innerWidth / window.innerHeight;

var clock, delta;
var map = {37: false, 38: false, 39: false, 40: false};
var frustumSize = 1000;
var lastPressed;

function addOranges() {
	createOrange(63, -1, 0);
	createOrange(57, -1, 20);
	createOrange(-55, -1, -20);
}

function addButters() {
	createButter(65, - 0.5, 40);
	createButter(53, -0.5, 0);
	createButter(-55, -0.5, 42);
	createButter(-64, -0.5, 37);
	createButter(-55, -0.5, -30);
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
	material = new THREE.MeshBasicMaterial({ color: 0x00cc66 });
	addTable(table, x, y, z);
	scene.add(table);
	addBorders();
	
}

function createButter(x, y, z) {
	'use strict';
	
	var butter = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	geometry = new THREE.CubeGeometry(3, 1.5, 6);
	mesh = new THREE.Mesh(geometry, material);
	butter.add(mesh);
	butter.position.set(x, y, z);
	scene.add(butter);
}

function createOrange(x, y, z) {
	'use strict';
	
	var orange = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffa500 });
	geometry = new THREE.SphereGeometry(2, 10, 10);
	mesh = new THREE.Mesh(geometry, material);
	orange.add(mesh);
	orange.position.set(x, y, z);
	scene.add(orange);
}

function createRing(x, y, z, flag) {
	'use strict';
	
	var ring = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0x000000 });
	geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
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

function createCamera() {
	'use strict';
	
	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 10, frustumSize * aspect / 10, frustumSize / 10, frustumSize / - 10, 1, 2000 );
	camera.position.y = 400;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x003300);
	createTable(0, 0, 0);
	car = new vehicle();
	createCar(car, 0, 0, 0);
	changePosition(car, 61, 1, 37);
	addOranges();
	addButters();
}

function render() {
	'use strict';
	
	renderer.render(scene, camera);
}	

function animate() {
	'use strict';

	calcVelocity(car);
	movement(car);
	render();
	requestAnimationFrame(animate);
}

function onResize() {
	'use strict';
	
	aspect = window.innerWidth / window.innerHeight;
	camera.left   = - frustumSize * aspect / 10;
	camera.right  =   frustumSize * aspect / 10;
	camera.top    =   frustumSize / 10;
	camera.bottom = - frustumSize / 10;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyDown(e) {
	'use strict';
	
	switch (e.keyCode) {
	
	case 65: //A
	case 97: //a
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
			}
		});
		break;

	case 37: //Arrow Left
		map[e.keyCode] = true;
		break;
	
	case 38: //Arrow Up
		map[e.keyCode] = true;
		break;
	
	case 39: //Arrow Right
		map[e.keyCode] = true;
		break;

	case 40: //Arrow Down
		map[e.keyCode] = true;
		break;
	}
	render();
}

function onKeyUp(e) {
	'use strict';
	switch (e.keyCode) {
		
	case 37: //Arrow Left
		map[e.keyCode] = false;
		break;	
		
	case 38: //Arrow Up
		map[e.keyCode] = false;
		car.lastPressed = "f";
		break;
		
	case 39: //Arrow Right
		map[e.keyCode] = false;
		break;	
		
	case 40: //Arrow Down
		map[e.keyCode] = false;
		car.lastPressed = "b";
		break;	
	
	}
	render();
}

function init() {
	'use strict';
	
	clock = new THREE.Clock();
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createCamera();
	
	render();
	
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}