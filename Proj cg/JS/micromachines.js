var camera, scene, renderer;

var car, ring;
var geometry, material, mesh;

var aspect = window.innerWidth / window.innerHeight;

var clock, delta;
var map = {37: false, 38: false, 39: false, 40: false};
var frustumSize = 1000;
var lastPressed, changed, cameraType;


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Adds (numberOranges) between the min and max values randomly
 */
function addOranges(numberOranges) {
	for (var i=0; i<numberOranges; i++){
		createOrange(getRandomInt(-70, 70), -1, getRandomInt(-50, 50));
	}
}

/**
 * Adds (numberButters) between the min and max values randomly
 */
function addButters(numberButters) {
	for (var i=0; i<numberButters; i++){
		createButter(getRandomInt(-70, 70), 0, getRandomInt(-50, 50));
	}
}

function addBorders() {
	'use strict';
	for(var i=0; i< 21; i++) {
		createRing(48-i*4.5, 0, 53);
		createRing(47.5-i*4.8, 0, -52.5);
		createRing(48, 0, 53-i*5);
		createRing(-48, 0, 53-i*5);
	}
	for(i=0; i<29; i++) {
		createRing(70-i*4.84, 0, 70.5);
		createRing(70-i*4.84, 0, -69.5);
		createRing(70, 0, 70.5-i*5);
		createRing(-70, 0, 70.5-i*5);
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

function createRing(x, y, z) {
	'use strict';
	var ring = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0x000000 });
	geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
	mesh = new THREE.Mesh(geometry, material);
	ring.add(mesh);
	ring.position.set(x, y, z);
	ring.rotateX(1.4);
	scene.add(ring);
}


/**
 * CombinedCamera(width, height, fov, near, far, orthoNear, orthoFar)
 * Creates a CombinedCamera. This initializes 2 cameras, an OrthographicCamera and a PerspectiveCamera. The default is the perspective Camera.
 */
function createCamera() {
	'use strict';
	
	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 10, frustumSize * aspect / 10, frustumSize / 10, frustumSize / - 10, 1, 2000 );
	cameraType = 1;
	camera.position.y = 400;
	camera.lookAt(scene.position);
}

function createCamera2() {
	'use strict';
	
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	cameraType = 2;
	camera.position.y = 142.8;
	camera.lookAt(scene.position);
}

function createCamera3() {
	'use strict';
	camera = new THREE.PerspectiveCamera;
	cameraType = 3;
	camera.position.y = 10; // <-- this is relative to the cube's position
	camera.position.z = 50; // <-- this is relative to the cube's position
	car.obj.add(camera);
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x003300);
	createTable(0, 0, 0);
	car = new vehicle();
	createCar(car, 0, 0, 0);
	changePosition(car, 61, 1, 37);
	// Driver Camera (Chase Camera behind car View) - PerspectiveCamera( fov, aspect, near, far )


	addOranges(8);
	addButters(8);
}

function render() {
	'use strict';
	
	renderer.render(scene, camera);
}	

function animate() {
	cameraUpdate();
	calcVelocity(car);
	movement(car);
	onResize();
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

function cameraUpdate() {
	if (map[49]) {
		if (changed != "o") {
			createCamera();
			changed = "o";
		}
	} else if (map[50]) {
		if (changed != "p") {
			createCamera2();
			changed = "p";
		}
	} else if (map[51]) {
		if (changed != "mp") {
			createCamera3();
			changed = "mp";
		}
	}
	
	
}

function onKeyDown(e) {
	'use strict';
	
	switch (e.keyCode) {

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
	
	case 49:
		map[e.keyCode] = true;
		break;
	
	case 50:
		map[e.keyCode] = true;
		break;
	
	case 51:
		map[e.keyCode] = true;
		break;
	
	case 65: //A
	case 97: //a
		scene.traverse(function (node) {
		if (node instanceof THREE.Mesh) {
			node.material.wireframe = !node.material.wireframe;
		}
		});
		break;
	}
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
	
	case 49:
		map[e.keyCode] = false;
		break;
	
	case 50:
		map[e.keyCode] = false;
		break;
	
	case 51:
		map[e.keyCode] = false;
		break;
	
	}
}

function init() {
	'use strict';
	clock = new THREE.Clock();
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
	createCameras();
	render();
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
