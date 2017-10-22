/*
/ Construtor do carro
/ 
/ maxVel = velocidade limite do carro
/ currentVel = velocidade atual do carro
/ consVel = velocidade
/ pedalSwitch = desacelaração ao virar
/ lastPressed = desacelaração ao trocar andar para a frente/tras
/ 
*/	

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

/*
/ Funcao change position, para colocar o node do carro na pista
*/	

function changePosition(vehicle, x, y, z) {	
	'use strict';

	vehicle.obj.position.set(x, y, z);
}

/*
/ addWheel
/
/ Funcao que cria as rodas do carro, juntando o material e a geometria ao mesh do carro (torus), na posicao xyz
*/	
	
function addWheel(obj, x, y, z) {
	'use strict';
	
	material = new THREE.MeshBasicMaterial({ color: 0x000000 });
	geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotateY(1.5);
	mesh.rotateX(0);
	obj.add(mesh);
}

/*
/ addLight
/
/ Funcao que cria as luzes do carro, juntando o material e a geometria ao mesh do carro (esfera), na posicao xyz
*/	

function addLight(obj, x, y, z){
	'use strict';
	
	geometry = new THREE.SphereGeometry(0.5,32,32);
	material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

/*
/ addCar
/
/ Funcao que cria o carro, juntando o material e a geometria ao mesh do carro (cubo), na posicao xyz
*/	

function addCar(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.CubeGeometry(5, 2.5, 7);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

/*
/ createCar
/
/ Funcao que cria o conteudo do objeto carro, usando o carro (addCar),
/ as rodas (addWheel) e as luzes (addLight). Adiciona depois o resultado a cena
/
*/

function createCar(vehicle, x, y, z) {
	'use strict';
	
	vehicle.obj = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	addCar(vehicle.obj, x, y, z);
	addWheel(vehicle.obj, x+2.95, y, z+1.5);
	addWheel(vehicle.obj, x-2.95, y, z+1.5);
	addWheel(vehicle.obj, x+2.95, y, z-1.5);
	addWheel(vehicle.obj, x-2.95, y, z-1.5);
	addLight(vehicle.obj, x-1.5, y+1.5, z-2.5);
	addLight(vehicle.obj, x+1.5, y+1.5, z-2.5);
	scene.add(vehicle.obj);

}

/*
/ calcVelocity
/
/ calcula a velocidade, dependendo de premir a tecla up (38) ou down (40)
/ calcula tambem o atrito caso nao haja teclas premidas, e desloca-as
/
*/

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
			if (vehicle.lastPressed == "b") {
				vehicle.currentVel -= delta * vehicle.consVel;
				vehicle.obj.translateZ( vehicle.currentVel );
			}
			if (vehicle.lastPressed == "f") {
				vehicle.currentVel -= delta * vehicle.consVel;
				vehicle.obj.translateZ( -vehicle.currentVel );
			}
		}
	}
}


/*
/ movement
/ 
/ 
/ 
/
*/

function movement(vehicle) {
	'use strict';
	
	var yAxis = new THREE.Vector3(0, 1, 0);
	
	if (map[38]){
		if (map[37])
			vehicle.obj.rotateOnAxis(yAxis, 0.05);
		if (map[39])
			vehicle.obj.rotateOnAxis(yAxis, -0.05);
		if (vehicle.lastPressed == "b") {
			if (vehicle.currentVel - vehicle.pedalSwitch < 0)
				vehicle.currentVel = 0;
			else
				vehicle.currentVel -= vehicle.pedalSwitch;
			vehicle.lastPressed = "";
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
			if (vehicle.currentVel - vehicle.pedalSwitch < 0)
				vehicle.currentVel = 0;
			else
				vehicle.currentVel -= vehicle.pedalSwitch;
			vehicle.lastPressed = "";
		}
		vehicle.obj.translateZ( vehicle.currentVel );
	} else if (map[39]) {
		vehicle.obj.rotateOnAxis(yAxis, -0.07);
	} else if (map[37]) {
		vehicle.obj.rotateOnAxis(yAxis, 0.07);
	}
}
