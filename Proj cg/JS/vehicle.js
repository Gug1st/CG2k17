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
		this.BSphere;
		this.cantMove = "";
		this.inside = -1;
	}

	/*
	/ Funcao change position, para colocar o node do carro na pista
	*/
	changePosition(x, y, z) {
		'use strict';
		this.obj.position.set(x, y, z);
	}

	/*
	/ addWheel
	/
	/ Funcao que cria as rodas do carro, juntando o material e a geometria ao mesh do carro (torus), na posicao xyz
	*/
	addWheel(x, y, z) {
	'use strict';
	var diffuseColor = new THREE.Color(0.0,0.0,0.0);
	var specularColor = new THREE.Color(0.34,0.15,0.13);
	phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
	lambertMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
	basicMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
	var vertices = [
	-0.6,-1,-1,    0.6,-0.1,-1,    0.6, 0.1,-1,    -0.6, 1,-1,
	-0.6,-1, 1,    0.6,-0.1, 1,    0.6, 0.1, 1,    -0.6, 1, 1,
	];
	var faces = [
	2,1,0,    0,3,2,
	0,4,7,    7,3,0,
	0,1,5,    5,4,0,
	1,2,6,    6,5,1,
	2,3,7,    7,6,2,
	4,5,6,    6,7,4
	];
	geometry = new THREE.PolyhedronGeometry(vertices, faces, 0.7, 2);
	mesh = new THREE.Mesh(geometry, lambertMaterial);
	mesh.position.set(x, y, z);
	mesh.rotateX(1);
	this.obj.add(mesh);
}

	/*
	/ addLight
	/
	/ Funcao que cria as luzes do carro, juntando o material e a geometria ao mesh do carro (esfera), na posicao xyz
	*//* comment the material*/
	addLight(x, y, z){
		'use strict';

		var diffuseColor = new THREE.Color(1.0,0.81,0.0);
		var specularColor = new THREE.Color(0.7,0.52,0.41);
		phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		lambertMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});
		basicMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
		var vertices = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
		];
		var faces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
		];
		geometry = new THREE.PolyhedronGeometry(vertices, faces, 0.5, 2);

		mesh = new THREE.Mesh(geometry, lambertMaterial);

		mesh.position.set(x, y, z);
		this.obj.add(mesh);
	}

	/*
	/ addCar
	/
	/ Funcao que cria o carro, juntando o material e a geometria ao mesh do carro (cubo), na posicao xyz
	*/
	addCar(x, y, z) {
		'use strict';
		var diffuseColor = new THREE.Color(1.0,0.0,0.0);
		var specularColor = new THREE.Color(0.34,0.15,0.13);
		phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		lambertMaterial = new THREE.MeshLambertMaterial({color: 0xb20e0e});
		basicMaterial = new THREE.MeshBasicMaterial({color: 0xb20e0e});

		var vertices = [
    -1,-0.3,-1.3,    1,-0.3,-1.3,    1, 0.3,-1.3,    -1, 0.3,-1.3,
    -1,-0.3, 1.3,    1,-0.3, 1.3,    1, 0.3, 1.3,    -1, 0.3, 1.3,
		];
		var faces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
		];
		geometry = new THREE.PolyhedronGeometry(vertices, faces, 3.5, 0);
		mesh = new THREE.Mesh(geometry, lambertMaterial);
		mesh.position.set(x, y, z);
		this.obj.add(mesh);
	}

	addUpperCar(x, y, z) {
	'use strict';
	var diffuseColor = new THREE.Color(1.0,0.0,0.0);
	var specularColor = new THREE.Color(0.34,0.15,0.13);
	phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
	lambertMaterial = new THREE.MeshLambertMaterial({color: 0xb20e0e});
	basicMaterial = new THREE.MeshBasicMaterial({color: 0xb20e0e});
	var vertices = [
	-1,-0.3,-1.3,    1,-0.3,-1.3,    1, 0.3,-1.3,    -1, 0.3,-1.3,
	-1,-0.3, 1.3,    1,-0.3, 1.3,    1, 0.7, 1.3,    -1, 0.7, 1.3,
	];
	var faces = [
	2,1,0,    0,3,2,
	0,4,7,    7,3,0,
	0,1,5,    5,4,0,
	1,2,6,    6,5,1,
	2,3,7,    7,6,2,
	4,5,6,    6,7,4
	];
	geometry = new THREE.PolyhedronGeometry(vertices, faces, 2.5, 0);


	mesh = new THREE.Mesh(geometry, lambertMaterial);
	mesh.position.set(x, y, z);
	this.obj.add(mesh);
}

	/*
	/ createCar
	/
	/ Funcao que cria o conteudo do objeto carro, usando o carro (addCar),
	/ as rodas (addWheel) e as luzes (addLight). Adiciona depois o resultado a cena
	/
	*/
	createCar(x, y, z) {
		'use strict';
		this.addCar(x, y, z);
		this.addUpperCar(x, y+1, z);
		this.addWheel(x+2.55, y-0.5, z+1.5);
		this.addWheel(x-2.55, y-0.5, z+1.5);
		this.addWheel(x+2.55, y-0.5, z-1.5);
		this.addWheel(x-2.55, y-0.5, z-1.5);
		this.addLight(x-1.5, y+0.8, z-2.5);
		this.addLight(x+1.5, y+0.8, z-2.5);
		scene.add(this.obj);
	}

	vehicleBoundingSphere() {

		this.BSphere = new THREE.Sphere(this.obj.position, 4.42);
	}


	/*
	/ calcVelocity
	/
	/ calcula a velocidade, dependendo de premir a tecla up (38) ou down (40)
	/ calcula tambem o atrito caso nao haja teclas premidas, e desloca-as
	/
	*/
	calcVelocity() {
		'use strict';

		delta = clock.getDelta();

		if ((map[40] || map[38])) {
			if (this.currentVel <= this.maxVel){
				this.currentVel += delta * this.consVel;
			} else {
				this.currentVel = this.maxVel;
			}
		} else if (!map[40] || !map[38]) {
			if (this.currentVel > 0) {
				if (this.lastPressed == "b" && this.cantMove != "b") {
					this.currentVel -= delta * this.consVel;
					this.obj.translateZ( this.currentVel );
				}
				if (this.lastPressed == "f" && this.cantMove != "f") {
					this.currentVel -= delta * this.consVel;
					this.obj.translateZ( -this.currentVel );
				}
			}
		}
	}


	/*
	/ movement
	/
	*/
	movement() {
		'use strict';

		var yAxis = new THREE.Vector3(0, 1, 0);

		if (map[38] && this.cantMove != "f"){
			if (map[37])
				this.obj.rotateOnAxis(yAxis, 0.05);
			if (map[39])
				this.obj.rotateOnAxis(yAxis, -0.05);
			if (this.lastPressed == "b") {
				if (this.currentVel - this.pedalSwitch < 0)
					this.currentVel = 0;
				else
					this.currentVel -= this.pedalSwitch;
				this.lastPressed = "";
			}
			this.obj.translateZ( - this.currentVel );
		} else if (map[40] && this.cantMove != "b") {
			if (map[37])
				this.obj.rotateOnAxis(yAxis, 0.05);
			if (map[39])
				this.obj.rotateOnAxis(yAxis, -0.05);
			if (this.currentVel >= this.maxVel / 2)
				this.currentVel = this.maxVel / 2;
			if (this.lastPressed == "f") {
				if (this.currentVel - this.pedalSwitch < 0)
					this.currentVel = 0;
				else
					this.currentVel -= this.pedalSwitch;
				this.lastPressed = "";
			}
			this.obj.translateZ( this.currentVel );
			} else if (map[39]) {
				this.obj.rotateOnAxis(yAxis, -0.07);
			} else if (map[37]) {
				this.obj.rotateOnAxis(yAxis, 0.07);
			}
		}

}
