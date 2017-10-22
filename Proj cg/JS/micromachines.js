var cameraOrthographic, cameraPerspective, cameraDriver, scene, renderer;

var car, ring;
var geometry, material, mesh;

var aspect = window.innerWidth / window.innerHeight;

var clock, delta;
var map = {37: false, 38: false, 39: false, 40: false};
var frustumSize = 1000;
var lastPressed, lastCamera;


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
function createCameras() {
	'use strict';
	// Orthographic Camera (Top View) - OrthographicCamera( left, right, top, bottom, near, far )
	cameraOrthographic = new THREE.OrthographicCamera( frustumSize * aspect / - 10, frustumSize * aspect / 10, frustumSize / 10, frustumSize / - 10, 1, 2000 );
	cameraOrthographic.position.y = 400;
	cameraOrthographic.lookAt(scene.position);
	// Perspective Camera (Perspective View) - PerspectiveCamera( fov, aspect, near, far )
	cameraPerspective = new THREE.PerspectiveCamera( 90, frustumSize * aspect / frustumSize, 1, 2000 );
	cameraPerspective.position.y = 50;
	cameraPerspective.position.x = -100;
	cameraPerspective.position.z = 50;
	cameraPerspective.lookAt(scene.position);
	cameraDriver = new THREE.PerspectiveCamera( 90, frustumSize * aspect / frustumSize, 1, 2000 );
	car.obj.add(cameraDriver);
	cameraDriver.position.y = 5;
	cameraDriver.position.z = 10;
	scene.add(cameraOrthographic);
	scene.add(cameraPerspective);
	lastCamera = 1;
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
	if (lastCamera == 1) {
		renderer.render(scene, cameraOrthographic);
	}
	else if  (lastCamera == 2){
		renderer.render(scene, cameraPerspective);
	}
	else if (lastCamera == 3){
		renderer.render(scene, cameraDriver);
	}
}

function updateChaseCam(){
	var vectorChaseCam = new THREE.Vector3(0,0,0);
	var cameraMovement = vectorChaseCam.applyMatrix4(car.matrixWorld);
	cameraDriver.position.x = cameraMovement.x;
	cameraDriver.position.y = cameraMovement.y;
	cameraDriver.position.z = cameraMovement.z;
	cameraDriver.lookAt( car.position );
}

function animate() {
	'use strict';
	calcVelocity(car);
	movement(car);
	//updateChaseCam();
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

	case 49: // 1 - Orthographic Camera
		map[e.keyCode] = true;
		lastCamera=1;
		break;

	case 50: // 2 - Perspective Camera
		map[e.keyCode] = true;
		lastCamera=2;
		break;

	case 51: // 3 - Driver Camera
		map[e.keyCode] = true;
		lastCamera=3;
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

	case 49: // 1 - Orthographic Camera
		map[e.keyCode] = false;
		break;

	case 50: // 2 - Perspective Camera
		map[e.keyCode] = false;
		break;

	case 51: // 3 - Driver Camera
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
