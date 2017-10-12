class vehicle {
	
	constructor() {
		this.maxVel = 0.5;
		this.currentVel = 0;
		this.consVel = 0.2;
		this.pedalSwitch = 0.1;
		this.lastPressed = "";
		this.obj = new THREE.Object3D();
	}
}
	
function changePosition(vehicle, x, y, z) {	
	'use strict';

	vehicle.obj.position.set(x, y, z);
}
	
function addWheel(obj, x, y, z) {
	'use strict';
	
	material = new THREE.MeshBasicMaterial({ color: 0x000000 });
	geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotateY(1.5);
	mesh.rotateX(0.55);
	obj.add(mesh);
}

function addLight(obj, x, y, z){
	'use strict';
	
	geometry = new THREE.SphereGeometry(0.5,32,32);
	material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addCar(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.CubeGeometry(5, 1, 7);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function createCar(vehicle, x, y, z) {
	'use strict';
	
	vehicle.obj = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	addCar(vehicle.obj, x, y, z);
	addWheel(vehicle.obj, x+3, y+1, z+1.5);
	addWheel(vehicle.obj, x-3, y+1, z+1.5);
	addWheel(vehicle.obj, x+3, y+1, z-1.5);
	addWheel(vehicle.obj, x-3, y+1, z-1.5);
	addLight(vehicle.obj, x-1.5, y+1, z-2.5);
	addLight(vehicle.obj, x+1.5, y+1, z-2.5);
	scene.add(vehicle.obj);

}

function calcVelocity(vehicle) {
	'use strict';
	
	delta = clock.getDelta();
	
	if (map[40] || map[38]) {
		if (vehicle.currentVel <= vehicle.maxVel){
			vehicle.currentVel += delta * vehicle.consVel;
		} else {
			vehicle.currentVel = vehicle.maxVel;
		}
	} else if (!map[40] || !map[38]) {
		if (vehicle.currentVel > 0) {
			vehicle.currentVel -= delta * vehicle.consVel + 0.001;
			if (vehicle.lastPressed == "f")
				vehicle.obj.translateZ( - vehicle.currentVel );
			else if (lastPressed == "b")
				vehicle.obj.translateZ( vehicle.currentVel );
		} else { 
			vehicle.currentVel = 0;
		}
	}
}

function movement(vehicle) {
	'use strict';
	
	var yAxis = new THREE.Vector3(0, 1, 0);
	
	if (map[38]){
		if (map[37])
			vehicle.obj.rotateOnAxis(yAxis, 0.05);
		if (map[39])
			vehicle.obj.rotateOnAxis(yAxis, -0.05);
		if (vehicle.lastPressed == "b") {
			if (vehicle.currentVel - vehicle.currentVel < 0)
				vehicle.currentVel = 0;
			vehicle.lastPressed = "";
			vehicle.currentVel -= vehicle.pedalSwitch;
		}
		vehicle.obj.translateZ( - vehicle.currentVel );
	} else if (map[40]) {
		if (map[37])
			vehicle.obj.rotateOnAxis(yAxis, 0.05);
		if (map[39])
			vehicle.obj.rotateOnAxis(yAxis, -0.05);
		if (vehicle.currentVel >= vehicle.maxVel / 2)
			vehicle.currentVel = vehicle.maxVel / 2;
		if (vehicle.lastPressed == "f") {
			if (vehicle.currentVel - vehicle.currentVel < 0)
				vehicle.currentVel = 0;
			vehicle.lastPressed = "";
			vehicle.currentVel -= vehicle.pedalSwitch;
		}
		vehicle.obj.translateZ( vehicle.currentVel );
	} else if (map[39]) {
		vehicle.obj.rotateOnAxis(yAxis, -0.07);
	} else if (map[37]) {
		vehicle.obj.rotateOnAxis(yAxis, 0.07);
	}
}
