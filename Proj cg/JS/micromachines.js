/*global THREE*/

var camera, scene, renderer;

var car;
var geometry, material, mesh;

function addOranges() {
	createOrange(63, 1, 0);
	createOrange(57, 1, 20);
	createOrange(-55, 1, -20);
}

function addButters() {
	createButter(65, 1, 40);
	createButter(53, 1, 0);
	createButter(-55, 1, 42);
	createButter(-64, 1, 37);
	createButter(-55, 1, -30);
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
		createRing(x+3, y+1, z+1.5, "z");
		createRing(x-3, y+1, z+1.5, "z");
		createRing(x+3, y+1, z-1.5, "z");
		createRing(x-3, y+1, z-1.5, "z");
}

function addCar(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.CubeGeometry(5, 1, 7);
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
	
	material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	
	addTable(table, x, y, z);
	
	scene.add(table);
	
	addBorders();
	
}

function createCar(x, y, z) {
	'use strict';
	
	car = new THREE.Object3D();
	car.userData = { moving: false, speed: 50 };
	
	material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	
	addCar(car, x, y, z);
	
	scene.add(car);
	
	addWheels(x, y, z);
}

function createButter(x, y, z) {
	'use strict';
	
	var butter = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	geometry = new THREE.CubeGeometry(1.5, 1.5, 5);
	mesh = new THREE.Mesh(geometry, material);
	
	butter.add(mesh);
	butter.position.set(x, y, z);
	
	scene.add(butter);
}

function createOrange(x, y, z) {
	'use strict';
	
	var orange = new THREE.Object3D();
	
	material = new THREE.MeshBasicMaterial({ color: 0xffa500 });
	geometry = new THREE.SphereGeometry(1.5, 10, 10);
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
	
	camera = new THREE.OrthographicCamera( window.innerWidth / - 10, window.innerWidth / 10, window.innerHeight / 10, window.innerHeight / - 10, 1, 1000 );
	camera.position.x = 0;
	camera.position.y = 70;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';
	
	scene = new THREE.Scene();
	
	createTable(0, 0, 0);
	createCar(-63, 0, 0);
	addOranges();
	addButters();
}

function animate() 
{
    requestAnimationFrame(animate);
	render();		
}	

function render() {
	'use strict';
	
	renderer.render(scene, camera);
}

function animate() {
	'use strict';
	
	if (car.userData.moving) {
		car.position.y = car.userData.speed + 5;

	}
	render();
	
	requestAnimationFrame(animate);
}

function onResize() {
	'use strict';
	
	var aspect = window.innerWidth / window.innerHeight;
	
				camera.left   = - 185 * aspect / 2;
				camera.right  =   185 * aspect / 2;
				camera.top    =   185 / 2;
				camera.bottom = - 185 / 2;
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
	case 83: //S
	case 115: //s
		car.userData.moving = !car.userData.moving;
		break;
	}
	
	render();
}

function init() {
	'use strict';
	
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createCamera();
	
	render();
	
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
}