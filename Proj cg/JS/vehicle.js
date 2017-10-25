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
		this.collision = false;
		this.BSphere;
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
	
		material = new THREE.MeshBasicMaterial({ color: 0x000000 });
		geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		mesh.rotateY(1.5);
		mesh.rotateX(0);
		this.obj.add(mesh);
	}

	/*
	/ addLight
	/
	/ Funcao que cria as luzes do carro, juntando o material e a geometria ao mesh do carro (esfera), na posicao xyz
	*/	
	addLight(x, y, z){
		'use strict';
	
		geometry = new THREE.SphereGeometry(0.5,32,32);
		material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
		mesh = new THREE.Mesh(geometry, material);

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
	
		geometry = new THREE.CubeGeometry(5, 2.5, 7);
		mesh = new THREE.Mesh(geometry, material);
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
	
		material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

		this.addCar(x, y, z);

		this.addWheel(x+2.95, y-0.4, z+1.5);
		this.addWheel(x-2.95, y-0.4, z+1.5);
		this.addWheel(x+2.95, y-0.4, z-1.5);
		this.addWheel(x-2.95, y-0.4, z-1.5);
		this.addLight(x-1.5, y+1.5, z-2.5);
		this.addLight(x+1.5, y+1.5, z-2.5);

		scene.add(this.obj);

	}

	vehicleBoundingSphere() {

		this.BSphere = new THREE.Sphere(this.obj.position, 4.43);
		/*for (var i = 0; i < this.obj.children.length; i++)
	    	this.obj.children[i].geometry.computeBoundingSphere();*/
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
	
		if (map[40] || map[38]) {
			if (this.currentVel <= this.maxVel){
				this.currentVel += delta * this.consVel;
			} else {
				this.currentVel = this.maxVel;
			}
		} else if (!map[40] || !map[38]) {
			if (this.currentVel > 0) {
				if (this.lastPressed == "b") {
					this.currentVel -= delta * this.consVel;
					this.obj.translateZ( this.currentVel );
				}
				if (this.lastPressed == "f") {
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
	
		if (map[38]){
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
		} else if (map[40]) {
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
